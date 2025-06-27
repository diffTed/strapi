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

const { completeAttributeData } = require('./complete-attribute-data');
const { completeValueTranslations } = require('./complete-value-translations');

async function populateAttributes() {
  let strapi;

  try {
    // Try to get existing strapi instance or create one
    if (global.strapi) {
      strapi = global.strapi;
    } else {
      // Create a Strapi instance for standalone execution
      const Strapi = require('@strapi/strapi');
      strapi = await Strapi().load();
    }

    console.log('Starting attribute population...');

    // Get services
    const attributeService = strapi.entityService;

    let createdAttributesCount = 0;
    let createdValuesCount = 0;

    // Create attributes with translations
    for (const attributeData of completeAttributeData) {
      console.log(`Creating attribute: ${attributeData.key}`);

      try {
        // Check if attribute already exists
        const existingAttribute = await attributeService.findMany('api::attribute.attribute', {
          filters: { key: attributeData.key },
          limit: 1
        });

        let attribute;
        if (existingAttribute && existingAttribute.length > 0) {
          console.log(`  - Attribute ${attributeData.key} already exists, skipping...`);
          attribute = existingAttribute[0];
        } else {
          // Create the attribute
          attribute = await attributeService.create('api::attribute.attribute', {
            data: {
              key: attributeData.key,
              category: attributeData.category,
              subcategory: attributeData.subcategory,
              selectionType: attributeData.selectionType,
              sortOrder: attributeData.sortOrder,
              isActive: attributeData.isActive,
              label: attributeData.label,
              description: attributeData.description,
              locale: 'en',
              publishedAt: new Date()
            }
          });

          console.log(`  - Created attribute: ${attribute.key}`);
          createdAttributesCount++;

          // Create localizations for other languages
          const languages = ['lt', 'lv', 'et', 'pl', 'de', 'ru'];
          for (const lang of languages) {
            try {
              await attributeService.create('api::attribute.attribute', {
                data: {
                  key: attributeData.key,
                  category: attributeData.category,
                  subcategory: attributeData.subcategory,
                  selectionType: attributeData.selectionType,
                  sortOrder: attributeData.sortOrder,
                  isActive: attributeData.isActive,
                  label: attributeData.label,
                  description: attributeData.description,
                  locale: lang,
                  localizations: [attribute.id],
                  publishedAt: new Date()
                }
              });
              console.log(`    - Created ${lang} localization`);
            } catch (locError) {
              console.warn(`    - Warning: Could not create ${lang} localization:`, locError.message);
            }
          }
        }

        // Create attribute values
        if (attributeData.values && attributeData.values.length > 0) {
          console.log(`  - Creating ${attributeData.values.length} values for ${attributeData.key}`);

          for (let i = 0; i < attributeData.values.length; i++) {
            const valueKey = attributeData.values[i];
            const translations = completeValueTranslations[valueKey];

            if (!translations) {
              console.warn(`    - Warning: No translations found for value: ${valueKey}`);
              continue;
            }

            try {
              // Check if value already exists
              const existingValue = await attributeService.findMany('api::attribute-value.attribute-value', {
                filters: {
                  key: valueKey,
                  attribute: attribute.id
                },
                limit: 1
              });

              if (existingValue && existingValue.length > 0) {
                console.log(`    - Value ${valueKey} already exists, skipping...`);
                continue;
              }

              // Create the value in English
              const attributeValue = await attributeService.create('api::attribute-value.attribute-value', {
                data: {
                  key: valueKey,
                  attribute: attribute.id,
                  sortOrder: i + 1,
                  isActive: true,
                  label: translations.en,
                  locale: 'en',
                  publishedAt: new Date()
                }
              });

              console.log(`      - Created value: ${valueKey} (${translations.en})`);
              createdValuesCount++;

              // Create localizations for other languages
              const languages = ['lt', 'lv', 'et', 'pl', 'de', 'ru'];
              for (const lang of languages) {
                if (translations[lang]) {
                  try {
                    await attributeService.create('api::attribute-value.attribute-value', {
                      data: {
                        key: valueKey,
                        attribute: attribute.id,
                        sortOrder: i + 1,
                        isActive: true,
                        label: translations[lang],
                        locale: lang,
                        localizations: [attributeValue.id],
                        publishedAt: new Date()
                      }
                    });
                    console.log(`        - Created ${lang} localization: ${translations[lang]}`);
                  } catch (locError) {
                    console.warn(`        - Warning: Could not create ${lang} localization:`, locError.message);
                  }
                }
              }
            } catch (valueError) {
              console.error(`    - Error creating value ${valueKey}:`, valueError.message);
            }
          }
        }

      } catch (error) {
        console.error(`Error processing attribute ${attributeData.key}:`, error.message);
      }
    }

    console.log('\n✅ Attribute population completed!');
    console.log(`📊 Created ${createdAttributesCount} attributes and ${createdValuesCount} values`);
    console.log('\nYou can now use these attributes in your products.');

  } catch (error) {
    console.error('❌ Error during population:', error);
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
