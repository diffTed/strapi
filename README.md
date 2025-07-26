# Perfume Store - Strapi Backend

A Strapi 5 backend for a multilingual perfume e-commerce platform with Medusa 2.0 integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run locally with Railway
railway login
railway link
railway run npm run develop

# Or run locally without Railway
npm run develop
```

## ✨ Features

- **Strapi 5** with PostgreSQL database
- **Multi-language support** (English, Arabic, Russian, Lithuanian, Latvian, Estonian, Polish, German)
- **Medusa 2.0 integration** for e-commerce functionality
- **Multi-select custom fields** for product attributes
- **Railway deployment** ready
- **SEO optimization** with meta fields
- **Brand and category management**

## 🏗️ Architecture

### Content Types

| Content Type | Description                                       | i18n Support |
| ------------ | ------------------------------------------------- | ------------ |
| **Product**  | Main product content with multi-select attributes | ✅ Yes       |
| **Category** | Product categories with hierarchical structure    | ✅ Yes       |
| **Brand**    | Perfume brands                                    | ✅ Yes       |
| **Page**     | Static content pages                              | ✅ Yes       |

### Product Attributes System

The product system uses **multi-select custom fields** instead of traditional relations:

- **Country of Origin**: Single selection from predefined countries
- **Perfume Type**: Single selection (EDP, EDT, Cologne, etc.)
- **Custom Attributes**: Easy to add new multi-select fields

#### Multi-Select Format

All multi-select fields use the `label:key` format:

- **Admin UI**: Shows English labels (e.g., "United Arab Emirates")
- **Database**: Stores keys (e.g., "uae")
- **Frontend**: Receives keys for translation

Example:

```json
{
  "country_of_origin": ["uae"],
  "perfume_type": ["edp"]
}
```

## 🌐 Localization

The system supports 7 languages:

- English (en) - Default
- Arabic (ar)
- Russian (ru)
- Lithuanian (lt)
- Latvian (lv)
- Estonian (et)
- Polish (pl)
- German (de)

**Translation Strategy:**

- Admin interface: English labels
- Frontend: Translation keys for multi-language support
- No translation complexity in Strapi

## 🔧 Development

### Adding New Multi-Select Fields

1. Edit `src/api/product/content-types/product/schema.json`
2. Add new custom field with multi-select plugin
3. Use `label:key` format for options

Example:

```json
"new_attribute": {
  "type": "customField",
  "customField": "plugin::multi-select.multi-select",
  "options": [
    "Option 1:option1",
    "Option 2:option2"
  ],
  "required": true,
  "max": 1
}
```

### API Endpoints

- **Products**: `/api/products`
- **Categories**: `/api/categories`
- **Brands**: `/api/brands`
- **Pages**: `/api/pages`

All endpoints support:

- Localization via `?locale=xx` parameter
- Population via `?populate=*`
- Filtering and sorting

## 🚀 Deployment

### Railway (Recommended)

1. Click the Railway button above
2. Add environment variables
3. Deploy automatically

### Manual Deployment

1. Set up PostgreSQL database
2. Configure environment variables
3. Run `npm run build`
4. Start with `npm start`

## 📝 Environment Variables

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=key1,key2,key3,key4
```

## 🔄 Medusa Integration

The system integrates with Medusa 2.0 for e-commerce functionality:

- **Product Sync**: Automatic product creation/updates
- **Status Management**: Draft, proposed, published, rejected
- **ID Mapping**: Medusa IDs for seamless integration

## 📊 Database Schema

The system uses a simplified schema without complex attribute relations:

- **Products**: Direct multi-select fields for attributes
- **Categories**: Hierarchical structure
- **Brands**: Simple brand management
- **Pages**: Static content management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
