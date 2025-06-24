module.exports = () => ({
  register({ strapi }) {
    strapi.customFields.register({
      name: "read-only-text",
      plugin: "read-only-fields",
      type: "string",
    });

    strapi.customFields.register({
      name: "read-only-enum",
      plugin: "read-only-fields",
      type: "enumeration",
    });
  },

  bootstrap({ strapi }) {},
});
