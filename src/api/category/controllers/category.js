"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    // Upsert method for Medusa sync - creates or updates category (like products)
    async upsertByMedusaId(ctx) {
      const { medusa_id, locale = "en", ...categoryData } = ctx.request.body;

      if (!medusa_id) {
        return ctx.badRequest("medusa_id is required");
      }

      try {
        // Check if category already exists
        const existingCategory = await strapi
          .documents("api::category.category")
          .findFirst({
            filters: { medusa_id },
          });

        if (existingCategory) {
          // Category exists - update the specific locale
          const updateData = { ...categoryData };
          if (locale === "en") {
            // Only update non-localized fields for base locale
            updateData.medusa_id = medusa_id; // Ensure medusa_id is preserved
          }

          const updatedCategory = await strapi
            .documents("api::category.category")
            .update({
              documentId: existingCategory.documentId,
              locale,
              data: updateData,
            });

          strapi.log.info(`Category updated: ${medusa_id} (${locale})`);
          return { data: updatedCategory, action: "updated" };
        } else {
          // Category doesn't exist - create new base document
          if (locale !== "en") {
            return ctx.badRequest(
              "New categories must be created in the default locale (en) first",
            );
          }

          const newCategory = await strapi
            .documents("api::category.category")
            .create({
              data: { medusa_id, ...categoryData },
              locale,
            });

          strapi.log.info(`Category created: ${medusa_id} (${locale})`);
          return { data: newCategory, action: "created" };
        }
      } catch (error) {
        strapi.log.error(`Category upsert failed: ${error.message}`);
        ctx.throw(500, `Failed to upsert category: ${error.message}`);
      }
    },
  }),
);
