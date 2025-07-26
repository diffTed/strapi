"use strict";

/**
 * Custom routes for brand
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/brands/slug/:slug",
      handler: "brand.findBySlug",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
