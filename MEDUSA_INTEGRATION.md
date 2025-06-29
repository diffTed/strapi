# Medusa 2.0 Integration Guide

## Overview

This Strapi CMS is configured to work alongside Medusa 2.0 e-commerce platform. The integration is handled through protected fields in the Product content type.

## Protected Medusa Fields

### `medusa_id` Field

#### Purpose

The `medusa_id` field is used to link Strapi content with Medusa 2.0 products. This allows you to:

- Manage product content (descriptions, SEO) in multiple languages via Strapi
- Keep product data (pricing, inventory) in Medusa
- Sync content between both systems

#### Behavior

- **Read-only in Admin Panel**: Content managers can view but cannot edit this field
- **API-only updates**: Can only be set/updated via API calls
- **Unique constraint**: Each `medusa_id` can only be used once (enforced at application level)
- **Shared across locales**: Same `medusa_id` appears in all language versions of a product

### `medusa_status` Field

#### Purpose

The `medusa_status` field tracks the publication status from Medusa/Odoo system. This allows you to:

- Display publication status without allowing edits
- Show if products are drafts or published in Medusa
- Maintain status consistency between systems

#### Behavior

- **Read-only in Admin Panel**: Content managers can view but cannot edit this field
- **API-only updates**: Can only be set/updated via API calls
- **Default value**: "draft" (products from Odoo come as drafts)
- **Valid values**: "draft" | "published" | "proposed" | "rejected"

## API Endpoints

### Product Endpoints

#### Standard Product Operations

```bash
# Get all products
GET /api/products

# Get products in specific language
GET /api/products?locale=es

# Get single product
GET /api/products/:id

# Create product (medusa_id and medusa_status are read-only in admin panel)
POST /api/products
{
  "data": {
    "title": "Product Title",
    "description": "Product description",
    "seoTitle": "SEO Title",
    "seoDescription": "SEO Description",
    "medusa_id": "prod_01234567890",
    "medusa_status": "draft"
  }
}

# Update product (medusa_id and medusa_status are read-only in admin panel)
PUT /api/products/:id
{
  "data": {
    "title": "Updated Title",
    "medusa_status": "published"
  }
}
```

### Custom Medusa Integration Endpoints

#### Find Product by Medusa ID

Get a product by its Medusa ID (returns all localizations):

```bash
GET /api/products/by-medusa-id/:medusa_id
```

#### Upsert Product (Recommended for Sync)

Creates or updates a product based on medusa_id:

```bash
POST /api/products/upsert
{
  "medusa_id": "prod_01234567890",
  "locale": "en",
  "title": "Product Title",
  "description": "Product description",
  "medusa_status": "published"
}
```

This endpoint will:

- Create a new product if `medusa_id` doesn't exist (must use `locale: "en"`)
- Update existing product's localization if it exists

#### Set Medusa ID (Legacy)

Used to link a Strapi product with a Medusa product:

```bash
PUT /api/products/:id/medusa-id
{
  "medusa_id": "prod_01234567890"
}
```

#### Update Medusa Fields (Legacy)

Used to update both medusa_id and medusa_status:

```bash
PUT /api/products/:id/medusa-fields
{
  "medusa_id": "prod_01234567890",
  "medusa_status": "published"
}

# Other possible status values: "draft", "proposed", "rejected"
```

Note: You can update either field individually or both together.

#### Sync with Medusa (Legacy)

Endpoint for future Medusa synchronization (to be implemented):

```bash
POST /api/products/sync-medusa
```

### Category Endpoints

#### Standard Category Operations

```bash
# Get all categories
GET /api/categories

# Get categories in specific language
GET /api/categories?locale=es

# Get single category with relations
GET /api/categories/:id?populate=parent_category,child_categories,products
```

#### Medusa Integration Endpoint

##### Sync Category from Medusa (Recommended)

Create or update a category when syncing from Medusa:

```bash
POST /api/categories/sync-from-medusa
{
  "medusa_id": "pcat_01234567890",
  "name": "Category Name",
  "description": "Category description",
  "medusa_handle": "category-handle",
  "parent_medusa_id": "pcat_parent123"  // optional for subcategories
}
```

**Note**: Categories are managed in Medusa. This endpoint is used when:

- Syncing all categories from Medusa
- Syncing individual products (with their category data)
- Initial category setup

## Integration Workflow

### Recommended: Automatic Sync via Upsert API

For automated synchronization from Medusa to Strapi:

#### 1. Create Base Product (English)

```bash
curl -X POST http://localhost:1337/api/products/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "medusa_id": "prod_01234567890",
    "locale": "en",
    "title": "Product Title",
    "description": "Product description",
    "medusa_status": "published"
  }'
```

#### 2. Add Other Language Versions

```bash
# Spanish version
curl -X POST http://localhost:1337/api/products/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "medusa_id": "prod_01234567890",
    "locale": "es",
    "title": "Título del Producto",
    "description": "Descripción del producto"
  }'

# French version
curl -X POST http://localhost:1337/api/products/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "medusa_id": "prod_01234567890",
    "locale": "fr",
    "title": "Titre du Produit",
    "description": "Description du produit"
  }'
```

This approach creates **one product document** with **multiple localizations**, not separate products.

### Category Sync from Medusa

For automated category synchronization from Medusa to Strapi:

#### 1. Sync Parent Categories First

```bash
curl -X POST http://localhost:1337/api/categories/sync-from-medusa \
  -H "Content-Type: application/json" \
  -d '{
    "medusa_id": "pcat_clothing",
    "name": "Clothing",
    "description": "All clothing items",
    "medusa_handle": "clothing"
  }'
```

#### 2. Sync Child Categories

```bash
curl -X POST http://localhost:1337/api/categories/sync-from-medusa \
  -H "Content-Type: application/json" \
  -d '{
    "medusa_id": "pcat_shirts",
    "name": "Shirts",
    "description": "All shirt types",
    "medusa_handle": "shirts",
    "parent_medusa_id": "pcat_clothing"
  }'
```

#### 3. Categories Show on Products

Categories are automatically linked to products and visible in the admin panel when you view any product.

### Manual: Create Products via Admin Panel

#### 1. Create Product in Medusa

1. Create your product in Medusa 2.0
2. Note the product ID (e.g., `prod_01234567890`)

#### 2. Create Content in Strapi

1. Create the product content in Strapi admin panel
2. Add title, description, SEO fields in multiple languages
3. Save the product (without medusa_id)

#### 3. Link Products

Use the API to link them and set initial status:

```bash
# Just set medusa_id
curl -X PUT http://localhost:1337/api/products/1/medusa-id \
  -H "Content-Type: application/json" \
  -d '{"medusa_id": "prod_01234567890"}'

# Or set both medusa_id and status
curl -X PUT http://localhost:1337/api/products/1/medusa-fields \
  -H "Content-Type: application/json" \
  -d '{"medusa_id": "prod_01234567890", "medusa_status": "published"}'

# Status can be: "draft", "published", "proposed", "rejected"
```

### 4. Use in Frontend

Query products with their Medusa links:

```bash
# Get product with medusa_id
GET /api/products?filters[medusa_id][$eq]=prod_01234567890

# Get all products for a locale
GET /api/products?locale=es&populate=*
```

## Service Methods

The product service includes helper methods:

```javascript
// Find product by Medusa ID
const product = await strapi
  .service("api::product.product")
  .findByMedusaId("prod_01234567890", "en");

// Find products with locale
const products = await strapi
  .service("api::product.product")
  .findWithLocale("es");
```

## Frontend Integration Example

```javascript
// Fetch product content from Strapi
const strapiProduct = await fetch(
  `${STRAPI_URL}/api/products?filters[medusa_id][$eq]=${medusaProductId}&locale=${locale}`,
);

// Fetch product data from Medusa
const medusaProduct = await fetch(
  `${MEDUSA_URL}/store/products/${medusaProductId}`,
);

// Combine data
const product = {
  ...medusaProduct.data,
  content: strapiProduct.data[0]?.attributes,
};
```

## Security Notes

- Both `medusa_id` and `medusa_status` fields are read-only in the admin panel
- Consider adding authentication to the custom endpoints in production
- Use API tokens for automated synchronization processes
- Content managers can view the fields but cannot edit them directly

## Meilisearch Integration

This project includes integration with Meilisearch for powerful, multilingual search capabilities. See [MEILISEARCH_INTEGRATION.md](./MEILISEARCH_INTEGRATION.md) for detailed documentation.

### Architecture Overview

The search architecture uses:

- **Strapi**: Manages and indexes product content (descriptions, attributes, etc.)
- **Medusa**: Manages and indexes commerce data (prices, inventory, publication status)
- **Meilisearch**: Combines data from both systems for unified search

### Key Implementation Details

1. **Separate Language Indices**:

   - Each language has its own index (product_en, product_lt, etc.)
   - Content is automatically indexed in the appropriate language index

2. **Medusa Integration**:

   - Products are linked via the `medusaId` field
   - Medusa directly updates its fields in Meilisearch indices
   - Frontend filters by Medusa publication status

3. **Automatic Synchronization**:
   - Strapi content changes are automatically indexed
   - Medusa updates its own fields directly in Meilisearch

### Example Frontend Integration

```javascript
// Initialize Meilisearch client
const searchClient = new MeiliSearch({
  host: "http://your-meilisearch-host:7700",
  apiKey: "your-public-key",
});

// Get product data from both systems
async function getProductData(query, locale = "en") {
  // Search in the appropriate language index
  const index = searchClient.index(`product_${locale}`);

  // Search with Medusa publication filter
  const results = await index.search(query, {
    filter: "published = true",
  });

  return results;
}
```

## Future Enhancements

- Automated sync between Medusa and Strapi
- Webhook integration for real-time updates
- Bulk import/export functionality
- Advanced mapping configurations
- Enhanced search capabilities with faceted filtering
- Search analytics and insights
