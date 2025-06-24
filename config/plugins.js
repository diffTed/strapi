module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "local",
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: "en",
      locales: ["en", "lt", "lv", "et", "pl", "de"],
    },
  },
  "read-only-fields": {
    enabled: true,
    resolve: "./src/plugins/read-only-fields",
  },
});
