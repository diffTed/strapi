"use strict";

/**
 * page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::page.page", ({ strapi }) => ({
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

  // Custom method to find page by slug
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale = "en" } = ctx.query;

    if (!slug) {
      return ctx.badRequest("Slug is required");
    }

    try {
      const page = await strapi.documents("api::page.page").findFirst({
        filters: {
          slug,
          isActive: true,
        },
        locale,
      });

      if (!page) {
        return ctx.notFound("Page not found");
      }

      return { data: page };
    } catch (error) {
      ctx.badRequest("Failed to fetch page", { error: error.message });
    }
  },

  // Extend the default create method
  async create(ctx) {
    // Auto-generate slug if not provided
    if (
      ctx.request.body.data &&
      ctx.request.body.data.title &&
      !ctx.request.body.data.slug
    ) {
      const { title } = ctx.request.body.data;
      ctx.request.body.data.slug = title
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
    // Auto-generate slug if title is updated but no slug provided
    if (
      ctx.request.body.data &&
      ctx.request.body.data.title &&
      !ctx.request.body.data.slug
    ) {
      const { title } = ctx.request.body.data;
      ctx.request.body.data.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .trim("-"); // Remove leading/trailing hyphens
    }

    const response = await super.update(ctx);
    return response;
  },

  // Extend the default delete method
  async delete(ctx) {
    const response = await super.delete(ctx);
    return response;
  },
}));
