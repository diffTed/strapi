"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async syncFromMedusa(ctx) {
      const { medusa_id, name, description, medusa_handle, parent_medusa_id } =
        ctx.request.body;

      if (!medusa_id) {
        return ctx.badRequest("medusa_id is required for sync operation");
      }

      try {
        // Get all configured locales from i18n plugin
        const i18nPlugin = strapi.plugin("i18n");
        const locales = await i18nPlugin.services.locales.find();
        const defaultLocale =
          locales.find((locale) => locale.isDefault)?.code || "en";

        // Check if category exists in default locale
        const existingCategories = await strapi.entityService.findMany(
          "api::category.category",
          {
            filters: { medusa_id },
            locale: defaultLocale,
            populate: ["parent_category", "localizations"],
          },
        );

        let parent_category = null;
        if (parent_medusa_id) {
          const parentCategories = await strapi.entityService.findMany(
            "api::category.category",
            {
              filters: { medusa_id: parent_medusa_id },
              locale: defaultLocale,
              limit: 1,
            },
          );
          if (parentCategories && parentCategories.length > 0) {
            parent_category = parentCategories[0].id;
          }
        }

        const categoryData = {
          medusa_id,
          medusa_handle,
          parent_category,
          name: name || "Untitled Category",
          description: description || "",
        };

        let defaultCategory;

        if (existingCategories && existingCategories.length > 0) {
          // Update existing category in default locale
          defaultCategory = await strapi.entityService.update(
            "api::category.category",
            existingCategories[0].id,
            {
              data: categoryData,
              locale: defaultLocale,
              populate: [
                "parent_category",
                "child_categories",
                "localizations",
              ],
            },
          );

          strapi.log.info(
            `Category updated from Medusa: ${medusa_id} (${defaultLocale})`,
          );
        } else {
          // Create new category in default locale
          defaultCategory = await strapi.entityService.create(
            "api::category.category",
            {
              data: categoryData,
              locale: defaultLocale,
              populate: [
                "parent_category",
                "child_categories",
                "localizations",
              ],
            },
          );

          strapi.log.info(
            `Category created from Medusa: ${medusa_id} (${defaultLocale})`,
          );
        }

        // Create or update localizations for all other locales
        const createdLocalizations = [];
        for (const locale of locales) {
          if (locale.code !== defaultLocale) {
            try {
              // Check if localization already exists
              const existingLocalization = await strapi.entityService.findMany(
                "api::category.category",
                {
                  filters: { medusa_id },
                  locale: locale.code,
                  limit: 1,
                },
              );

              if (existingLocalization && existingLocalization.length > 0) {
                // Update existing localization
                const updatedLocalization = await strapi.entityService.update(
                  "api::category.category",
                  existingLocalization[0].id,
                  {
                    data: categoryData,
                    locale: locale.code,
                  },
                );
                createdLocalizations.push({
                  locale: locale.code,
                  action: "updated",
                  id: updatedLocalization.id,
                });
                strapi.log.info(
                  `Category localization updated: ${medusa_id} (${locale.code})`,
                );
              } else {
                // Create new localization
                const newLocalization = await strapi.entityService.create(
                  "api::category.category",
                  {
                    data: {
                      ...categoryData,
                      localizations: [defaultCategory.id],
                    },
                    locale: locale.code,
                  },
                );
                createdLocalizations.push({
                  locale: locale.code,
                  action: "created",
                  id: newLocalization.id,
                });
                strapi.log.info(
                  `Category localization created: ${medusa_id} (${locale.code})`,
                );
              }
            } catch (localeError) {
              strapi.log.error(
                `Failed to create/update localization for ${locale.code}: ${localeError.message}`,
              );
            }
          }
        }

        ctx.body = {
          category: defaultCategory,
          localizations: createdLocalizations,
          action:
            existingCategories && existingCategories.length > 0
              ? "updated"
              : "created",
        };
      } catch (error) {
        strapi.log.error(`Category sync failed: ${error.message}`);
        ctx.throw(500, `Failed to sync category: ${error.message}`);
      }
    },
  }),
);
