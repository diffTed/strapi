# Meilisearch Integration

This document describes the integration between Strapi, Medusa, and Meilisearch for the perfume store project.

## Overview

The architecture uses:

- **Strapi**: Content management (product descriptions, attributes, categories, etc.)
- **Medusa**: E-commerce functionality (prices, inventory, publication status)
- **Meilisearch**: Search engine that combines data from both systems

## Setup

### Installation

The Meilisearch plugin has been installed in the Strapi project:

```bash
npm install strapi-plugin-meilisearch
```

After installation, Strapi was rebuilt:

```bash
npm run strapi build
```

### Configuration

The Meilisearch configuration is defined in `config/plugins.js`:

```javascript
meilisearch: {
  config: {
    // Meilisearch host and API key
    host: env('MEILISEARCH_HOST', 'http://localhost:7700'),
    apiKey: env('MEILISEARCH_API_KEY', ''),

    // Product indices for each language
    'product_en': {
      indexName: 'product_en',
      entriesQuery: {
        locale: 'en',
        populate: ['categories', 'brand', 'attributeValues'],
      },
      settings: {
        searchableAttributes: [
          'title',
          'description',
          'brand.name',
          'categories.name',
          'attributeValues.attribute.name',
          'attributeValues.value'
        ],
        filterableAttributes: [
          'categories.id',
          'brand.id',
          'attributeValues.attribute.id',
          'attributeValues.id',
          'medusaId'
        ],
        sortableAttributes: [
          'title',
          'updatedAt'
        ]
      },
    },
    // Additional language indices follow the same pattern
  }
}
```

## Multilingual Approach

We use separate indices for each supported language:

- product_en (English)
- product_lt (Lithuanian)
- product_lv (Latvian)
- product_et (Estonian)
- product_pl (Polish)
- product_de (German)
- product_ru (Russian)

This approach provides:

- Better search relevance for each language
- Cleaner separation of content
- Easier filtering and sorting by language

## Medusa Integration

### Architecture

1. **Strapi** handles content management:

   - Product descriptions, attributes, categories, etc.
   - Automatically pushes content to Meilisearch via the plugin

2. **Medusa** handles commerce functionality:
   - Prices, inventory, publication status
   - Directly updates Meilisearch using the same indices
   - Uses `medusaId` as the common identifier

### Implementation Details

The `medusaId` field in the product schema serves as the link between systems:

```json
"medusa_id": {
  "type": "string",
  "required": false,
  "pluginOptions": {
    "i18n": {
      "localized": false
    }
  }
}
```

## Frontend Implementation

### Search Client Setup

```javascript
import { MeiliSearch } from "meilisearch";

// Initialize the client
const searchClient = new MeiliSearch({
  host: "http://your-meilisearch-host:7700",
  apiKey: "your-public-key", // Use the public key for searching
});

// Get the index for the current language
const languageCode = "en"; // Or get from user preferences
const index = searchClient.index(`product_${languageCode}`);

// Perform a search
const results = await index.search("perfume", {
  filter: "categories.id = 123", // Optional filters
});
```

### Filtering by Medusa Status

When Medusa updates the publication status directly in Meilisearch, you can filter by this field:

```javascript
// Only show products that are published in Medusa
const results = await index.search("perfume", {
  filter: "published = true",
});
```

## Environment Variables

Required environment variables:

```
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=your_master_key_here
```

## Maintenance

### Reindexing

If you need to reindex all content:

1. Go to the Strapi admin panel
2. Navigate to the Meilisearch plugin page
3. Select the indices to reindex
4. Click "Reindex"

### Troubleshooting

If content is not appearing in search results:

1. Check that the content is published in Strapi
2. Verify that Meilisearch is running
3. Check the Strapi logs for indexing errors
4. Try manually reindexing the content

## Security

- Use the master/private key for Strapi to update Meilisearch
- Use a public key for frontend search operations
- Never expose the master/private key in frontend code

## Resources

- [Meilisearch Documentation](https://docs.meilisearch.com/)
- [Strapi Meilisearch Plugin](https://market.strapi.io/plugins/strapi-plugin-meilisearch)
- [Medusa Documentation](https://docs.medusajs.com/)
