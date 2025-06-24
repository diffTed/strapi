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
    // Check if this is a base document creation (not a localization)
    const isBaseDocument = !ctx.query.relatedEntityId;
    const locale = ctx.query.locale || "en";

    // For base documents, require medusa_id and check uniqueness
    if (isBaseDocument && locale === "en" && ctx.request.body.data) {
      if (!ctx.request.body.data.medusa_id) {
        return ctx.badRequest(
          "medusa_id is required for base product creation",
        );
      }

      // Check if medusa_id already exists
      const existingProduct = await strapi
        .documents("api::product.product")
        .findFirst({
          filters: { medusa_id: ctx.request.body.data.medusa_id },
        });

      if (existingProduct) {
        return ctx.badRequest(
          `Product with medusa_id "${ctx.request.body.data.medusa_id}" already exists`,
        );
      }
    }

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

  // Helper method to find product by medusa_id
  async findByMedusaId(ctx) {
    const { medusa_id } = ctx.params;

    if (!medusa_id) {
      return ctx.badRequest("medusa_id is required");
    }

    try {
      const product = await strapi.documents("api::product.product").findFirst({
        filters: { medusa_id },
        populate: "*",
      });

      if (!product) {
        return ctx.notFound(`Product with medusa_id "${medusa_id}" not found`);
      }

      return { data: product };
    } catch (error) {
      ctx.badRequest("Failed to find product", { error: error.message });
    }
  },

  // Upsert method for Medusa sync - creates or updates product
  async upsertByMedusaId(ctx) {
    const { medusa_id, locale = "en", ...productData } = ctx.request.body;

    if (!medusa_id) {
      return ctx.badRequest("medusa_id is required");
    }

    try {
      // Check if product already exists
      const existingProduct = await strapi
        .documents("api::product.product")
        .findFirst({
          filters: { medusa_id },
        });

      if (existingProduct) {
        // Product exists - update the specific locale
        const updatedProduct = await strapi
          .documents("api::product.product")
          .update({
            documentId: existingProduct.documentId,
            locale,
            data: productData,
          });

        return { data: updatedProduct, action: "updated" };
      } else {
        // Product doesn't exist - create new base document
        if (locale !== "en") {
          return ctx.badRequest(
            "New products must be created in the default locale (en) first",
          );
        }

        // Auto-generate slug if not provided
        if (productData.title && !productData.slug) {
          productData.slug = productData.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim("-");
        }

        const newProduct = await strapi
          .documents("api::product.product")
          .create({
            data: { medusa_id, ...productData },
            locale,
          });

        return { data: newProduct, action: "created" };
      }
    } catch (error) {
      ctx.badRequest("Failed to upsert product", { error: error.message });
    }
  },

  async update(ctx) {
    // Check for medusa_id uniqueness if it's being updated
    if (ctx.request.body.data && ctx.request.body.data.medusa_id) {
      const existingProduct = await strapi
        .documents("api::product.product")
        .findFirst({
          filters: {
            medusa_id: ctx.request.body.data.medusa_id,
            documentId: { $ne: ctx.params.id },
          },
        });

      if (existingProduct) {
        return ctx.badRequest(
          `Product with medusa_id "${ctx.request.body.data.medusa_id}" already exists`,
        );
      }
    }

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
