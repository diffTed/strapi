"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/categories/upsert",
      handler: "category.upsertByMedusaId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
