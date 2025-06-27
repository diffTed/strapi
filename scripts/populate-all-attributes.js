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

    console.log("Starting attribute population...");

    let createdAttributesCount = 0;
    let createdValuesCount = 0;

    // Create attributes with translations
    for (const [attributeKey, attributeData] of Object.entries(
      completeAttributeData,
    )) {
      console.log(`Creating attribute: ${attributeKey}`);

      try {
        // Check if attribute already exists in any language
        const existingAttributes = await strapi
          .documents("api::attribute.attribute")
          .findMany({
            filters: { key: attributeKey },
            locale: "all",
          });

        if (existingAttributes && existingAttributes.length > 0) {
          console.log(
            `  - Attribute ${attributeKey} already exists in ${existingAttributes.length} languages, skipping...`,
          );
          continue;
        }

        // Step 1: Create the base attribute in English
        const baseAttribute = await strapi
          .documents("api::attribute.attribute")
          .create({
            data: {
              key: attributeKey,
              category: attributeData.category,
              subcategory: attributeData.subcategory || null,
              selectionType: attributeData.selectionType,
              sortOrder: attributeData.sortOrder,
              isActive: true,
              label: attributeData.labels.en.label,
              description: attributeData.labels.en.description,
            },
            locale: "en",
          });

        console.log(`  - Created base attribute: ${attributeKey} (en)`);
        createdAttributesCount++;

        // Step 2: Create localizations for other languages
        const otherLanguages = ["lt", "lv", "et", "pl", "de", "ru"];
        for (const lang of otherLanguages) {
          try {
            await strapi.documents("api::attribute.attribute").create({
              data: {
                key: attributeKey,
                category: attributeData.category,
                subcategory: attributeData.subcategory || null,
                selectionType: attributeData.selectionType,
                sortOrder: attributeData.sortOrder,
                isActive: true,
                label: attributeData.labels[lang].label,
                description: attributeData.labels[lang].description,
              },
              locale: lang,
            });
            console.log(`    - Created ${lang} localization`);
          } catch (langError) {
            console.warn(
              `    - Warning: Could not create ${lang} localization:`,
              langError.message,
            );
          }
        }

        // Step 3: Create attribute values
        if (attributeData.values && attributeData.values.length > 0) {
          console.log(
            `  - Creating ${attributeData.values.length} values for ${attributeKey}`,
          );

          for (let i = 0; i < attributeData.values.length; i++) {
            const valueKey = attributeData.values[i];
            const translations = completeValueTranslations[valueKey];

            if (!translations) {
              console.warn(
                `    - Warning: No translations found for value: ${valueKey}`,
              );
              continue;
            }

            try {
              // Check if value already exists in any language
              const existingValues = await strapi
                .documents("api::attribute-value.attribute-value")
                .findMany({
                  filters: {
                    key: valueKey,
                    attribute: baseAttribute.id,
                  },
                  locale: "all",
                });

              if (existingValues && existingValues.length > 0) {
                console.log(
                  `    - Value ${valueKey} already exists, skipping...`,
                );
                continue;
              }

              // Step 3a: Create the base value in English
              const baseValue = await strapi
                .documents("api::attribute-value.attribute-value")
                .create({
                  data: {
                    key: valueKey,
                    attribute: baseAttribute.id,
                    sortOrder: i + 1,
                    isActive: true,
                    label: translations.en,
                  },
                  locale: "en",
                });

              console.log(
                `      - Created base value: ${valueKey} (${translations.en})`,
              );
              createdValuesCount++;

              // Step 3b: Create localizations for other languages
              for (const lang of otherLanguages) {
                if (translations[lang]) {
                  try {
                    await strapi
                      .documents("api::attribute-value.attribute-value")
                      .create({
                        data: {
                          key: valueKey,
                          attribute: baseAttribute.id,
                          sortOrder: i + 1,
                          isActive: true,
                          label: translations[lang],
                        },
                        locale: lang,
                      });
                    console.log(
                      `        - Created ${lang} localization: ${translations[lang]}`,
                    );
                  } catch (valueLangError) {
                    console.warn(
                      `        - Warning: Could not create ${lang} value:`,
                      valueLangError.message,
                    );
                  }
                }
              }
            } catch (valueError) {
              console.error(
                `    - Error creating value ${valueKey}:`,
                valueError.message,
              );
            }
          }
        }
      } catch (error) {
        console.error(
          `Error processing attribute ${attributeKey}:`,
          error.message,
        );
      }
    }

    console.log("\n✅ Attribute population completed!");
    console.log(
      `📊 Created ${createdAttributesCount} attributes and ${createdValuesCount} values`,
    );
    console.log("\nYou can now use these attributes in your products.");
  } catch (error) {
    console.error("❌ Error during population:", error);
  } finally {
    // Only destroy if we created the instance
    if (strapi && !global.strapi) {
      await strapi.destroy();
    }
  }
}

// Export for use in other scripts or run directly
if (require.main === module) {
  populateAttributes();
}

module.exports = { populateAttributes };
