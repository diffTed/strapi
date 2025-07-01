export default {
  config: {
    locales: ["en"],
  },
  bootstrap(app) {
    // Admin customizations for Strapi 5
    // Note: injectContentManagerComponent is not available in Strapi 5
    // Product attributes are now handled through standard relation fields
  },
};
