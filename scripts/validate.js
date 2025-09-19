#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

/**
 * Validates all JSON files in the project
 */
function validateJSON() {
  console.log("🔍 Validating JSON files...\n");

  const jsonFiles = glob.sync("**/*.json", {
    ignore: ["node_modules/**", ".git/**"],
  });

  let errors = 0;
  let validated = 0;

  jsonFiles.forEach((file) => {
    try {
      const content = fs.readFileSync(file, "utf8");
      JSON.parse(content);
      console.log(`✅ ${file}`);
      validated++;
    } catch (error) {
      console.log(`❌ ${file}: ${error.message}`);
      errors++;
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Validated: ${validated}`);
  console.log(`   Errors: ${errors}`);

  if (errors > 0) {
    console.log("\n❌ JSON validation failed!");
    process.exit(1);
  } else {
    console.log("\n✅ All JSON files are valid!");
  }
}

/**
 * Validates metadata structure
 */
function validateMetadata() {
  console.log("\n🔍 Validating metadata structure...\n");

  const metaFiles = glob.sync("**/content/**/meta.json", {
    ignore: ["node_modules/**", ".git/**"],
  });

  let errors = 0;
  let validated = 0;

  const requiredFields = [
    "id",
    "title",
    "type",
    "format",
    "version",
    "created_at",
    "created_by",
    "status",
  ];

  metaFiles.forEach((file) => {
    try {
      const content = JSON.parse(fs.readFileSync(file, "utf8"));

      // Check required fields
      const missingFields = requiredFields.filter((field) => !content[field]);

      if (missingFields.length > 0) {
        console.log(
          `❌ ${file}: Missing required fields: ${missingFields.join(", ")}`
        );
        errors++;
      } else {
        console.log(`✅ ${file}`);
        validated++;
      }
    } catch (error) {
      console.log(`❌ ${file}: ${error.message}`);
      errors++;
    }
  });

  console.log(`\n📊 Metadata Summary:`);
  console.log(`   Validated: ${validated}`);
  console.log(`   Errors: ${errors}`);

  return errors;
}

/**
 * Main validation function
 */
function main() {
  console.log("🚀 Starting TEX-DB Validation\n");

  validateJSON();
  const metaErrors = validateMetadata();

  if (metaErrors > 0) {
    console.log("\n❌ Metadata validation failed!");
    process.exit(1);
  }

  console.log("\n🎉 All validations passed!");
}

if (require.main === module) {
  main();
}

module.exports = { validateJSON, validateMetadata };
