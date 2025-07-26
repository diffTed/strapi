module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "local",
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: "en",
      locales: ["en", "ru", "lt", "lv", "et", "pl", "de"],
    },
  },
  meilisearch: {
    enabled: true,
    config: {
      // Meilisearch host and API key
      host: env("MEILISEARCH_HOST", "http://localhost:7700"),
      apiKey: env("MEILISEARCH_API_KEY", ""),

      // Single product index for all languages
      "api::product.product": {
        indexName: "products",
        entriesQuery: {
          locale: "*",
          populate: ["categories", "brand"],
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "brand.name",
            "categories.name",
            "country_of_origin",
            "perfume_type",
          ],
          filterableAttributes: [
            "categories.id",
            "brand.id",
            "country_of_origin",
            "perfume_type",
            "medusa_id",
            "locale",
          ],
          sortableAttributes: ["title", "updatedAt"],
        },
      },
    },
  },
});
