# Page Subkey Feature Guide

## Overview

The page collection now includes a `subkey` field that allows for more granular categorization of pages. This is particularly useful for legal pages and other specific content types.

## Available Subkeys

The following subkeys are available:

- `terms` - Terms and Conditions
- `privacy` - Privacy Policy
- `cookie` - Cookie Policy
- `cancel` - Cancellation Policy
- `returns` - Returns Policy
- `accessibility` - Accessibility Statement
- `impressum` - Legal Notice/Impressum

## API Endpoints

### 1. Find Page by Subkey

```bash
GET /api/pages/subkey/:subkey?locale=en
```

**Example:**

```bash
# Get privacy policy page
curl -X GET "http://localhost:1337/api/pages/subkey/privacy?locale=en"

# Get terms and conditions page
curl -X GET "http://localhost:1337/api/pages/subkey/terms?locale=en"
```

### 2. Find Page by Category and Subkey

```bash
GET /api/pages/category/:category/subkey/:subkey?locale=en
```

**Example:**

```bash
# Get privacy policy page in legal category
curl -X GET "http://localhost:1337/api/pages/category/legal/subkey/privacy?locale=en"

# Get terms page in legal category
curl -X GET "http://localhost:1337/api/pages/category/legal/subkey/terms?locale=en"
```

### 3. Find Pages by Category (existing)

```bash
GET /api/pages/category/:category?locale=en
```

**Example:**

```bash
# Get all legal pages
curl -X GET "http://localhost:1337/api/pages/category/legal?locale=en"
```

## Usage Examples

### Frontend Integration

```javascript
// Get privacy policy
const privacyPage = await fetch("/api/pages/subkey/privacy?locale=en");

// Get terms and conditions
const termsPage = await fetch("/api/pages/subkey/terms?locale=en");

// Get specific legal page
const legalPrivacyPage = await fetch(
  "/api/pages/category/legal/subkey/privacy?locale=en",
);
```

### Common Use Cases

1. **Legal Pages**: Use subkeys like `terms`, `privacy`, `cookie`, `impressum`
2. **Policy Pages**: Use subkeys like `cancel`, `returns`, `accessibility`
3. **Multi-language Support**: Combine with locale parameter for translations

## Admin Panel Usage

1. Go to **Content Manager** → **Page**
2. Create or edit a page
3. Select a **Category** (e.g., "legal")
4. Select a **Subkey** (e.g., "privacy")
5. Fill in the content and publish

## Benefits

- **Organized Content**: Better categorization of similar pages
- **Easy Retrieval**: Direct access to specific page types
- **Flexible Structure**: Can use subkey alone or with category
- **SEO Friendly**: Clear structure for search engines
- **Multi-language**: Supports all configured locales
