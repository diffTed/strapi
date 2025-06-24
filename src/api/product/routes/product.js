"use strict";

/**
 * product router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

// Core routes
const defaultRouter = createCoreRouter("api::product.product", {
  config: {
    find: {
      middlewares: [],
    },
    findOne: {
      middlewares: [],
    },
    create: {
      middlewares: [],
    },
    update: {
      middlewares: [],
    },
    delete: {
      middlewares: [],
    },
  },
});

// Custom routes
const customRoutes = {
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
  ],
};

// Merge default routes with custom routes
module.exports = {
  routes: [...defaultRouter.routes, ...customRoutes.routes],
};
