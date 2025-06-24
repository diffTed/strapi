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
    // Custom create logic if needed
    const response = await super.create(ctx);
    return response;
  },

  async update(ctx) {
    // Custom update logic if needed
    const response = await super.update(ctx);
    return response;
  },

  async delete(ctx) {
    // Custom delete logic if needed
    const response = await super.delete(ctx);
    return response;
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
