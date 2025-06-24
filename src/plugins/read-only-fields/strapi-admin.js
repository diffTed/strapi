export default {
  register(app) {
    app.customFields.register({
      name: "read-only-text",
      pluginId: "read-only-fields",
      type: "string",
      intlLabel: {
        id: "read-only-fields.read-only-text.label",
        defaultMessage: "Read-only Text",
      },
      intlDescription: {
        id: "read-only-fields.read-only-text.description",
        defaultMessage: "A read-only text field",
      },
      icon: "eye",
      components: {
        Input: async () => import("./components/ReadOnlyTextInput"),
      },
      options: {
        base: [],
        advanced: [],
        validator: () => ({}),
      },
    });

    app.customFields.register({
      name: "read-only-enum",
      pluginId: "read-only-fields",
      type: "enumeration",
      intlLabel: {
        id: "read-only-fields.read-only-enum.label",
        defaultMessage: "Read-only Enumeration",
      },
      intlDescription: {
        id: "read-only-fields.read-only-enum.description",
        defaultMessage: "A read-only enumeration field",
      },
      icon: "eye",
      components: {
        Input: async () => import("./components/ReadOnlyEnumInput"),
      },
      options: {
        base: [],
        advanced: [],
        validator: () => ({}),
      },
    });
  },

  bootstrap(app) {},
};
