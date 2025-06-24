"use strict";

/**
 * product service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::product.product", ({ strapi }) => ({
  // Custom service methods can be added here

  async findWithLocale(locale = "en", populate = {}) {
    return await strapi.documents("api::product.product").findMany({
      locale,
      populate,
    });
  },

  async findByMedusaId(medusaProductId, locale = "en") {
    return await strapi.documents("api::product.product").findFirst({
      where: { medusaProductId },
      locale,
    });
  },
}));
