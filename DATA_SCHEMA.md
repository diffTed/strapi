# Data Schema Overview

This document provides an overview of all content types in the perfume store project, their relationships, and how they work together.

## Content Types Overview

| Content Type | Description                                    | i18n Support |
| ------------ | ---------------------------------------------- | ------------ |
| Product      | Main product content type for perfumes         | ✅ Yes       |
| Category     | Product categories with hierarchical structure | ✅ Yes       |
| Brand        | Perfume brands                                 | ✅ Yes       |
| Page         | Static content pages                           | ✅ Yes       |

## Product Schema

The central content type for perfume products with integrated multi-select attributes.

### Fields

| Field             | Type         | i18n | Description                             |
| ----------------- | ------------ | ---- | --------------------------------------- |
| title             | String       | ✅   | Product name                            |
| description       | Rich Text    | ✅   | Detailed product description            |
| seoTitle          | String       | ✅   | SEO-optimized title                     |
| seoDescription    | Text         | ✅   | SEO-optimized description               |
| slug              | UID          | ✅   | URL-friendly identifier                 |
| medusa_id         | String       | ❌   | Medusa product ID (non-editable)        |
| medusa_status     | Enum         | ❌   | Status in Medusa (draft/published/etc.) |
| country_of_origin | Multi-Select | ❌   | Country of origin (single selection)    |
| perfume_type      | Multi-Select | ❌   | Perfume type (single selection)         |

### Multi-Select Attributes

The product uses custom multi-select fields instead of traditional relations:

#### Country of Origin

- **Type**: Single selection
- **Options**:
  - "United Arab Emirates:uae"
  - "Saudi Arabia:saudi-arabia"
  - "Qatar:qatar"
  - "Kuwait:kuwait"
  - "Bahrain:bahrain"
  - "Oman:oman"

#### Perfume Type

- **Type**: Single selection
- **Options**:
  - "Eau de Parfum (EDP):edp"
  - "Eau de Toilette (EDT):edt"
  - "Eau de Cologne:edc"
  - "Parfum (Extrait):parfum"
  - "Attar / Perfume Oil:attar"
  - "Solid Perfume:solid-perfume"
  - "Body Spray:body-spray"
  - "Hair Mist:hair-mist"

### Relations

| Relation   | Type         | Target   | Description        |
| ---------- | ------------ | -------- | ------------------ |
| categories | Many-to-Many | Category | Product categories |
| brand      | Many-to-One  | Brand    | Product brand      |

## Category Schema

Hierarchical structure for product categorization.

### Fields

| Field          | Type      | i18n | Description               |
| -------------- | --------- | ---- | ------------------------- |
| name           | String    | ✅   | Category name             |
| description    | Rich Text | ✅   | Category description      |
| slug           | UID       | ✅   | URL-friendly identifier   |
| seoTitle       | String    | ✅   | SEO-optimized title       |
| seoDescription | Text      | ✅   | SEO-optimized description |

### Relations

| Relation | Type         | Target   | Description               |
| -------- | ------------ | -------- | ------------------------- |
| parent   | Many-to-One  | Category | Parent category           |
| children | One-to-Many  | Category | Child categories          |
| products | Many-to-Many | Product  | Products in this category |

## Brand Schema

Perfume brands.

### Fields

| Field          | Type      | i18n | Description               |
| -------------- | --------- | ---- | ------------------------- |
| name           | String    | ✅   | Brand name                |
| description    | Rich Text | ✅   | Brand description         |
| slug           | UID       | ✅   | URL-friendly identifier   |
| seoTitle       | String    | ✅   | SEO-optimized title       |
| seoDescription | Text      | ✅   | SEO-optimized description |

### Relations

| Relation | Type        | Target  | Description              |
| -------- | ----------- | ------- | ------------------------ |
| products | One-to-Many | Product | Products from this brand |

## Page Schema

Static content pages (e.g., About Us, Privacy Policy).

### Fields

| Field          | Type      | i18n | Description               |
| -------------- | --------- | ---- | ------------------------- |
| title          | String    | ✅   | Page title                |
| content        | Rich Text | ✅   | Page content              |
| slug           | UID       | ✅   | URL-friendly identifier   |
| seoTitle       | String    | ✅   | SEO-optimized title       |
| seoDescription | Text      | ✅   | SEO-optimized description |
| isActive       | Boolean   | ❌   | Page visibility status    |
| sortOrder      | Integer   | ❌   | Display order             |
| category       | Enum      | ❌   | Page category             |

### Category Options

- **legal** - Legal pages (Privacy Policy, Terms, etc.)
- **about** - About pages (About Us, Company Info, etc.)
- **help** - Help/Support pages (FAQ, Contact Info, etc.)
- **contact** - Contact pages
- **general** - General pages (default)

## Multi-Select System

### Format: `label:key`

All multi-select fields use the `label:key` format:

- **label**: What appears in the admin UI (English text)
- **key**: What gets stored in the database (for frontend translation)

### Benefits

1. **Simplified Schema**: No complex attribute relations
2. **Easy Management**: Direct field editing in product form
3. **Translation Ready**: Keys for frontend translation
4. **Flexible**: Easy to add new multi-select fields

### Example Usage

```json
{
  "title": "Sample Perfume",
  "country_of_origin": ["uae"],
  "perfume_type": ["edp"]
}
```

**Admin UI**: Shows "United Arab Emirates" and "Eau de Parfum (EDP)"
**API Response**: Returns `["uae"]` and `["edp"]` for frontend translation

## Multilingual Support

All content types support localization in 8 languages:

- **English (en)** - Default language
- **Arabic (ar)**
- **Russian (ru)**
- **Lithuanian (lt)**
- **Latvian (lv)**
- **Estonian (et)**
- **Polish (pl)**
- **German (de)**

### Translation Strategy

- **Admin Interface**: English labels for multi-select fields
- **Frontend**: Translation keys for multi-language support
- **Content**: Full localization for titles, descriptions, etc.

## API Endpoints

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories

- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get specific category

### Brands

- `GET /api/brands` - List all brands
- `GET /api/brands/:id` - Get specific brand

### Pages

- `GET /api/pages` - List all pages
- `GET /api/pages/:id` - Get specific page
- `GET /api/pages/slug/:slug` - Get page by slug
- `GET /api/pages/category/:category` - Get pages by category

### Query Parameters

All endpoints support:

- `?locale=xx` - Specify language

### Page Category Examples

```bash
# Get all legal pages in English
GET /api/pages/category/legal?locale=en

# Get all legal pages in Arabic
GET /api/pages/category/legal?locale=ar

# Get all about pages in German
GET /api/pages/category/about?locale=de
```

- `?populate=*` - Include relations
- `?filters[field][$operator]=value` - Filter results
- `?sort=field:order` - Sort results
- `?pagination[page]=1&pagination[pageSize]=10` - Pagination

## Database Schema

The system uses a simplified schema:

```
products
├── id, title, description, slug
├── medusa_id, medusa_status
├── country_of_origin (JSON array)
├── perfume_type (JSON array)
└── relations: categories, brand

categories
├── id, name, description, slug
├── parent_category_id
└── relations: children, products

brands
├── id, name, description, slug
└── relations: products

pages
├── id, title, content, slug
└── seo fields
```

This approach eliminates the need for complex attribute and attribute-value tables while maintaining full functionality and translation support.
