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
      locales: ["en", "lt", "lv", "et", "pl", "de", "ru"],
    },
  },
  meilisearch: {
    enabled: true,
    config: {
      // Meilisearch host and API key
      host: env("MEILISEARCH_HOST", "http://localhost:7700"),
      apiKey: env("MEILISEARCH_API_KEY", ""),

      // Product indices for each language using the API format
      "api::product.product_en": {
        indexName: "product_en",
        entriesQuery: {
          locale: "en",
          populate: ["categories", "brand", "attributeValues"],
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "brand.name",
            "categories.name",
            "attributeValues.attribute.name",
            "attributeValues.value",
          ],
          filterableAttributes: [
            "categories.id",
            "brand.id",
            "attributeValues.attribute.id",
            "attributeValues.id",
            "medusaId",
          ],
          sortableAttributes: ["title", "updatedAt"],
        },
      },
      "api::product.product_lt": {
        indexName: "product_lt",
        entriesQuery: {
          locale: "lt",
          populate: ["categories", "brand", "attributeValues"],
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "brand.name",
            "categories.name",
            "attributeValues.attribute.name",
            "attributeValues.value",
          ],
          filterableAttributes: [
            "categories.id",
            "brand.id",
            "attributeValues.attribute.id",
            "attributeValues.id",
            "medusaId",
          ],
          sortableAttributes: ["title", "updatedAt"],
        },
      },
      "api::product.product_lv": {
        indexName: "product_lv",
        entriesQuery: {
          locale: "lv",
          populate: ["categories", "brand", "attributeValues"],
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "brand.name",
            "categories.name",
            "attributeValues.attribute.name",
            "attributeValues.value",
          ],
          filterableAttributes: [
            "categories.id",
            "brand.id",
            "attributeValues.attribute.id",
            "attributeValues.id",
            "medusaId",
          ],
          sortableAttributes: ["title", "updatedAt"],
        },
      },
      "api::product.product_et": {
        indexName: "product_et",
        entriesQuery: {
          locale: "et",
          populate: ["categories", "brand", "attributeValues"],
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "brand.name",
            "categories.name",
            "attributeValues.attribute.name",
            "attributeValues.value",
          ],
          filterableAttributes: [
            "categories.id",
            "brand.id",
            "attributeValues.attribute.id",
            "attributeValues.id",
            "medusaId",
          ],
          sortableAttributes: ["title", "updatedAt"],
        },
      },
      "api::product.product_pl": {
        indexName: "product_pl",
        entriesQuery: {
          locale: "pl",
          populate: ["categories", "brand", "attributeValues"],
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "brand.name",
            "categories.name",
            "attributeValues.attribute.name",
            "attributeValues.value",
          ],
          filterableAttributes: [
            "categories.id",
            "brand.id",
            "attributeValues.attribute.id",
            "attributeValues.id",
            "medusaId",
          ],
          sortableAttributes: ["title", "updatedAt"],
        },
      },
      "api::product.product_de": {
        indexName: "product_de",
        entriesQuery: {
          locale: "de",
          populate: ["categories", "brand", "attributeValues"],
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "brand.name",
            "categories.name",
            "attributeValues.attribute.name",
            "attributeValues.value",
          ],
          filterableAttributes: [
            "categories.id",
            "brand.id",
            "attributeValues.attribute.id",
            "attributeValues.id",
            "medusaId",
          ],
          sortableAttributes: ["title", "updatedAt"],
        },
      },
      "api::product.product_ru": {
        indexName: "product_ru",
        entriesQuery: {
          locale: "ru",
          populate: ["categories", "brand", "attributeValues"],
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "brand.name",
            "categories.name",
            "attributeValues.attribute.name",
            "attributeValues.value",
          ],
          filterableAttributes: [
            "categories.id",
            "brand.id",
            "attributeValues.attribute.id",
            "attributeValues.id",
            "medusaId",
          ],
          sortableAttributes: ["title", "updatedAt"],
        },
      },
    },
  },
});
