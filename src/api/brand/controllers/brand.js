"use strict";

/**
 * brand controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::brand.brand", ({ strapi }) => ({
  // Extend the default find method
  async find(ctx) {
    // Add custom logic if needed
    const response = await super.find(ctx);
    return response;
  },

  // Extend the default findOne method
  async findOne(ctx) {
    const response = await super.findOne(ctx);
    return response;
  },

  // Custom method to find brand by slug
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale = "en" } = ctx.query;

    if (!slug) {
      return ctx.badRequest("Slug is required");
    }

    try {
      const brand = await strapi.documents("api::brand.brand").findFirst({
        filters: {
          slug,
          isActive: true,
        },
        locale,
      });

      if (!brand) {
        return ctx.notFound("Brand not found");
      }

      return { data: brand };
    } catch (error) {
      ctx.badRequest("Failed to fetch brand", { error: error.message });
    }
  },

  // Extend the default create method
  async create(ctx) {
    // Auto-generate slug if not provided
    if (
      ctx.request.body.data &&
      ctx.request.body.data.name &&
      !ctx.request.body.data.slug
    ) {
      const { name } = ctx.request.body.data;
      ctx.request.body.data.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .trim("-"); // Remove leading/trailing hyphens
    }

    const response = await super.create(ctx);
    return response;
  },

  // Extend the default update method
  async update(ctx) {
    // Auto-generate slug if name is updated but no slug provided
    if (
      ctx.request.body.data &&
      ctx.request.body.data.name &&
      !ctx.request.body.data.slug
    ) {
      const { name } = ctx.request.body.data;
      ctx.request.body.data.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .trim("-"); // Remove leading/trailing hyphens
    }

    const response = await super.update(ctx);
    return response;
  },
}));
