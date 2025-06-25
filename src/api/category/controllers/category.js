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
        // Check if category exists
        const existingCategories = await strapi.entityService.findMany(
          "api::category.category",
          {
            filters: { medusa_id },
            populate: ["parent_category"],
          },
        );

        let parent_category = null;
        if (parent_medusa_id) {
          const parentCategories = await strapi.entityService.findMany(
            "api::category.category",
            {
              filters: { medusa_id: parent_medusa_id },
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

        if (existingCategories && existingCategories.length > 0) {
          // Update existing category
          const updatedCategory = await strapi.entityService.update(
            "api::category.category",
            existingCategories[0].id,
            {
              data: categoryData,
              populate: ["parent_category", "child_categories"],
            },
          );

          strapi.log.info(`Category updated from Medusa: ${medusa_id}`);
          ctx.body = { category: updatedCategory, action: "updated" };
        } else {
          // Create new category
          const newCategory = await strapi.entityService.create(
            "api::category.category",
            {
              data: categoryData,
              populate: ["parent_category", "child_categories"],
            },
          );

          strapi.log.info(`Category created from Medusa: ${medusa_id}`);
          ctx.body = { category: newCategory, action: "created" };
        }
      } catch (error) {
        strapi.log.error(`Category sync failed: ${error.message}`);
        ctx.throw(500, `Failed to sync category: ${error.message}`);
      }
    },
  }),
);
