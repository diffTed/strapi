export default {
  config: {
    locales: ["en"],
  },
  bootstrap(app) {
    // Customize the product edit view
    app.injectContentManagerComponent("editView", "right-links", {
      name: "product-attributes-helper",
      Component: async () => {
        const component = await import(
          "./extensions/components/ProductAttributesHelper"
        );
        return component;
      },
    });
  },
};
