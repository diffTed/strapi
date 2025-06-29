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
  ],
};
