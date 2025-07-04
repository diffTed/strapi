"use strict";

/**
 * Custom routes for page
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pages/slug/:slug",
      handler: "page.findBySlug",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/pages/category/:category",
      handler: "page.findByCategory",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
