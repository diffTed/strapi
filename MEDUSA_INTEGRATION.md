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

- **Not editable in Admin Panel**: Content managers cannot modify this field directly
- **API-only updates**: Can only be set/updated via API calls
- **Unique constraint**: Each `medusa_id` can only be used once

### `medusa_status` Field

#### Purpose

The `medusa_status` field tracks the publication status from Medusa/Odoo system. This allows you to:

- Display publication status without allowing edits
- Show if products are drafts or published in Medusa
- Maintain status consistency between systems

#### Behavior

- **Not editable in Admin Panel**: Content managers cannot modify this field directly
- **API-only updates**: Can only be set/updated via API calls
- **Default value**: "draft" (products from Odoo come as drafts)
- **Valid values**: "draft" | "published" | "proposed" | "rejected"

## API Endpoints

### Standard Product Operations

```bash
# Get all products
GET /api/products

# Get products in specific language
GET /api/products?locale=es

# Get single product
GET /api/products/:id

# Create product (medusa_id and medusa_status will be ignored from admin panel)
POST /api/products
{
  "data": {
    "title": "Product Title",
    "description": "Product description",
    "seoTitle": "SEO Title",
    "seoDescription": "SEO Description"
  }
}

# Update product (medusa_id and medusa_status will be ignored from admin panel)
PUT /api/products/:id
{
  "data": {
    "title": "Updated Title"
  }
}
```

### Custom Medusa Integration Endpoints

#### Set Medusa ID

Used to link a Strapi product with a Medusa product:

```bash
PUT /api/products/:id/medusa-id
{
  "medusa_id": "prod_01234567890"
}
```

#### Update Medusa Fields

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

#### Sync with Medusa

Endpoint for future Medusa synchronization (to be implemented):

```bash
POST /api/products/sync-medusa
```

## Integration Workflow

### 1. Create Product in Medusa

1. Create your product in Medusa 2.0
2. Note the product ID (e.g., `prod_01234567890`)

### 2. Create Content in Strapi

1. Create the product content in Strapi admin panel
2. Add title, description, SEO fields in multiple languages
3. Save the product (without medusa_id)

### 3. Link Products

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

- Both `medusa_id` and `medusa_status` fields are protected from admin panel modifications
- Consider adding authentication to the custom endpoints in production
- Use API tokens for automated synchronization processes
- Content managers can view the status but cannot change it directly

## Future Enhancements

- Automated sync between Medusa and Strapi
- Webhook integration for real-time updates
- Bulk import/export functionality
- Advanced mapping configurations
