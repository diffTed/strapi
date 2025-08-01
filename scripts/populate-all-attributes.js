/**
 * Populate All Attributes Script for Strapi
 *
 * This script populates the database with perfume attributes and their values
 * with translations in 7 languages: en, lt, lv, et, pl, de, ru
 *
 * Usage:
 * 1. Make sure Strapi is running: npm run develop
 * 2. In another terminal: node scripts/populate-all-attributes.js
 */

const { completeAttributeData } = require("./complete-attribute-data");
const { completeValueTranslations } = require("./complete-value-translations");

async function populateAttributes() {
  let strapi;

  try {
    // Try to get existing strapi instance or create one
    if (global.strapi) {
      strapi = global.strapi;
    } else {
      // Create a Strapi instance for standalone execution
      const Strapi = require("@strapi/strapi");
      strapi = await Strapi().load();
    }

    console.log("🚀 Starting attribute population...");

    // Clear existing data first
    console.log("🧹 Clearing existing attribute and attribute-value data...");
    await strapi.db
      .query("api::attribute-value.attribute-value")
      .deleteMany({});
    await strapi.db.query("api::attribute.attribute").deleteMany({});
    console.log("✅ Cleared existing data");

    const languages = ["en", "lt", "lv", "et", "pl", "de", "ru"];

    // Create attributes with translations
    for (const [attributeKey, attributeData] of Object.entries(
      completeAttributeData,
    )) {
      console.log(`Creating attribute: ${attributeKey}`);

      try {
        // STEP 1: Create the base attribute document in English first
        const baseAttribute = await strapi
          .documents("api::attribute.attribute")
          .create({
            data: {
              key: attributeKey,
              category: attributeData.category,
              subcategory: attributeData.subcategory,
              selectionType: attributeData.selectionType,
              sortOrder: attributeData.sortOrder,
              isActive: true,
              label: attributeData.labels?.en?.label || attributeKey,
              description: attributeData.labels?.en?.description || "",
            },
            locale: "en",
          });

        console.log(
          `  - Created base attribute: ${attributeKey} (documentId: ${baseAttribute.documentId})`,
        );

        // STEP 2: Create localizations using update() with same documentId
        const attributeLocalizations = { en: baseAttribute };
        for (const lang of languages.filter((l) => l !== "en")) {
          try {
            const localizedAttribute = await strapi
              .documents("api::attribute.attribute")
              .update({
                documentId: baseAttribute.documentId, // Same documentId = linked localization
                locale: lang, // Different locale
                data: {
                  // Include non-localized fields
                  key: attributeKey,
                  category: attributeData.category,
                  subcategory: attributeData.subcategory,
                  selectionType: attributeData.selectionType,
                  sortOrder: attributeData.sortOrder,
                  isActive: true,
                  // Include localized fields
                  label:
                    attributeData.labels?.[lang]?.label ||
                    attributeData.labels?.en?.label ||
                    attributeKey,
                  description:
                    attributeData.labels?.[lang]?.description ||
                    attributeData.labels?.en?.description ||
                    "",
                },
              });
            attributeLocalizations[lang] = localizedAttribute;
            console.log(`  - Created ${lang} localization for ${attributeKey}`);
          } catch (error) {
            console.log(
              `  - Warning: Could not create ${lang} localization:`,
              error.message,
            );
          }
        }

        // STEP 3: Create attribute values for this attribute
        const values = attributeData.values || [];
        console.log(`  - Creating ${values.length} values for ${attributeKey}`);

        for (const valueKey of values) {
          const valueTranslations = completeValueTranslations[valueKey];
          if (!valueTranslations) {
            console.log(
              `    - Warning: No translations found for value ${valueKey}`,
            );
            continue;
          }

          try {
            // Create the base value document in English first
            const baseValue = await strapi
              .documents("api::attribute-value.attribute-value")
              .create({
                data: {
                  key: valueKey,
                  attribute: attributeLocalizations.en.id, // Link to English attribute
                  sortOrder: 0,
                  isActive: true,
                  label: valueTranslations.en || valueKey,
                },
                locale: "en",
              });

            console.log(
              `      - Created value: ${valueKey} (${valueTranslations.en || valueKey}) - documentId: ${baseValue.documentId}`,
            );

            // Create localizations using update() with same documentId
            for (const lang of languages.filter((l) => l !== "en")) {
              try {
                const localizedAttribute = attributeLocalizations[lang];
                if (localizedAttribute) {
                  await strapi
                    .documents("api::attribute-value.attribute-value")
                    .update({
                      documentId: baseValue.documentId, // Same documentId = linked localization
                      locale: lang, // Different locale
                      data: {
                        // Include non-localized fields
                        key: valueKey,
                        attribute: localizedAttribute.id, // Link to localized attribute
                        sortOrder: 0,
                        isActive: true,
                        // Include localized fields
                        label:
                          valueTranslations[lang] ||
                          valueTranslations.en ||
                          valueKey,
                      },
                    });
                  console.log(
                    `        - Created ${lang} localization: ${valueTranslations[lang] || valueTranslations.en}`,
                  );
                }
              } catch (error) {
                console.log(
                  `        - Warning: Could not create ${lang} value localization:`,
                  error.message,
                );
              }
            }
          } catch (error) {
            console.log(
              `      - Error creating value ${valueKey}:`,
              error.message,
            );
          }
        }
      } catch (error) {
        console.log(
          `  - Error creating attribute ${attributeKey}:`,
          error.message,
        );
      }
    }

    console.log("✅ Attribute population completed successfully!");

    // If we created a standalone Strapi instance, close it
    if (!global.strapi) {
      await strapi.destroy();
    }
  } catch (error) {
    console.error("❌ Error during attribute population:", error);

    // If we created a standalone Strapi instance, close it
    if (!global.strapi && strapi) {
      await strapi.destroy();
    }

    process.exit(1);
  }
}

module.exports = { populateAttributes };

// If run directly
if (require.main === module) {
  populateAttributes();
}
