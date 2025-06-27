#!/usr/bin/env node

/**
 * Attribute Population Runner for Strapi
 *
 * This script runs the complete attribute population for the Strapi application.
 * It will create all perfume attributes with translations in 7 languages.
 *
 * Usage:
 * 1. Start Strapi in one terminal: npm run develop
 * 2. In another terminal run: node scripts/run-population.js
 *
 * Or run directly (will start/stop Strapi automatically):
 * NODE_ENV=development node scripts/run-population.js
 */

const path = require("path");

async function runPopulation() {
  // Change to the project root directory
  process.chdir(path.join(__dirname, ".."));

  try {
    console.log("🚀 Starting Strapi attribute population...");
    console.log("📍 Working directory:", process.cwd());

    // Import and run the population script
    const { populateAttributes } = require("./populate-all-attributes");
    await populateAttributes();

    console.log("✅ Population completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Population failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on("SIGINT", () => {
  console.log("\n⚠️ Process interrupted. Exiting...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n⚠️ Process terminated. Exiting...");
  process.exit(0);
});

// Run the population
runPopulation();
