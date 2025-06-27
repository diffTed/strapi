#!/usr/bin/env node

/**
 * Railway-compatible Attribute Population Script
 *
 * This script can be run on Railway or any production environment
 * to populate perfume attributes with translations.
 *
 * Usage on Railway:
 * Add this as a build/deploy command or run manually:
 * node scripts/populate-railway.js
 *
 * Local usage:
 * NODE_ENV=development node scripts/populate-railway.js
 */

async function main() {
  console.log("🚀 Starting Railway-compatible attribute population...");

  try {
    // Load Strapi
    const Strapi = require("@strapi/strapi");
    const app = await Strapi().load();

    console.log("✅ Strapi loaded successfully");

    // Import population function
    const { populateAttributes } = require("./populate-all-attributes");

    // Set global strapi for the population script
    global.strapi = app;

    // Run population
    await populateAttributes();

    console.log("🎉 Population completed successfully!");

    // Cleanup
    await app.destroy();
    process.exit(0);
  } catch (error) {
    console.error("❌ Population failed:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n⚠️ Received SIGINT, shutting down gracefully...");
  if (global.strapi) {
    await global.strapi.destroy();
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n⚠️ Received SIGTERM, shutting down gracefully...");
  if (global.strapi) {
    await global.strapi.destroy();
  }
  process.exit(0);
});

// Run the script
main();
