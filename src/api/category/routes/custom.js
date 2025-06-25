"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/categories/sync-from-medusa",
      handler: "category.syncFromMedusa",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
