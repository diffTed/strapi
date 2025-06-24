"use strict";

/**
 * Custom product routes for Medusa integration
 */

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/products/:id/medusa-id",
      handler: "product.setMedusaId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/products/:id/medusa-fields",
      handler: "product.updateMedusaFields",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/products/sync-medusa",
      handler: "product.syncWithMedusa",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/products/by-medusa-id/:medusa_id",
      handler: "product.findByMedusaId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/products/upsert",
      handler: "product.upsertByMedusaId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
