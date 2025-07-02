export default {
  config: {
    locales: ["en", "ar", "ru", "lt", "lv", "et", "pl", "de"],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "nufaar",
      },
    },
  },
  bootstrap(app) {
    // Admin customizations for Strapi 5
    // Note: injectContentManagerComponent is not available in Strapi 5
    // Product attributes are now handled through standard relation fields
  },
};
