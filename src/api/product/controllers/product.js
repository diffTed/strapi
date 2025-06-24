"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  // Custom controller methods can be added here

  async find(ctx) {
    // Custom find logic if needed
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // Custom findOne logic if needed
    const response = await super.findOne(ctx);
    return response;
  },

  async create(ctx) {
    // Prevent protected Medusa fields from being set via admin panel
    if (ctx.request.body.data && ctx.request.body.data.medusa_id) {
      // Only allow medusa_id to be set by API calls with proper authentication
      // Remove it from admin panel requests
      delete ctx.request.body.data.medusa_id;
    }
    if (ctx.request.body.data && ctx.request.body.data.medusa_status) {
      // Only allow medusa_status to be set by API calls with proper authentication
      // Remove it from admin panel requests
      delete ctx.request.body.data.medusa_status;
    }

    const response = await super.create(ctx);
    return response;
  },

  async update(ctx) {
    // Prevent protected Medusa fields from being modified via admin panel
    if (ctx.request.body.data && ctx.request.body.data.medusa_id) {
      // Only allow medusa_id to be set by API calls with proper authentication
      // Remove it from admin panel requests
      delete ctx.request.body.data.medusa_id;
    }
    if (ctx.request.body.data && ctx.request.body.data.medusa_status) {
      // Only allow medusa_status to be set by API calls with proper authentication
      // Remove it from admin panel requests
      delete ctx.request.body.data.medusa_status;
    }

    const response = await super.update(ctx);
    return response;
  },

  async delete(ctx) {
    // Custom delete logic if needed
    const response = await super.delete(ctx);
    return response;
  },

  // Custom method to set medusa_id programmatically (for API integration)
  async setMedusaId(ctx) {
    const { id } = ctx.params;
    const { medusa_id } = ctx.request.body;

    if (!medusa_id) {
      return ctx.badRequest("medusa_id is required");
    }

    try {
      const updatedProduct = await strapi
        .documents("api::product.product")
        .update({
          documentId: id,
          data: { medusa_id },
        });

      return { data: updatedProduct };
    } catch (error) {
      ctx.badRequest("Failed to set medusa_id", { error: error.message });
    }
  },

  // Custom method to update both medusa_id and medusa_status (for API integration)
  async updateMedusaFields(ctx) {
    const { id } = ctx.params;
    const { medusa_id, medusa_status } = ctx.request.body;

    if (!medusa_id && !medusa_status) {
      return ctx.badRequest(
        "At least one of medusa_id or medusa_status is required",
      );
    }

    try {
      const updateData = {};
      if (medusa_id) updateData.medusa_id = medusa_id;
      if (medusa_status) updateData.medusa_status = medusa_status;

      const updatedProduct = await strapi
        .documents("api::product.product")
        .update({
          documentId: id,
          data: updateData,
        });

      return { data: updatedProduct };
    } catch (error) {
      ctx.badRequest("Failed to update Medusa fields", {
        error: error.message,
      });
    }
  },

  // Custom method to sync with Medusa
  async syncWithMedusa(ctx) {
    try {
      // This would contain logic to sync products from Medusa 2.0
      // You can implement this based on your Medusa API integration
      ctx.body = {
        message: "Sync with Medusa functionality to be implemented",
      };
    } catch (error) {
      ctx.badRequest("Sync failed", { error: error.message });
    }
  },
}));
