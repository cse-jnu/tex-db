#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

/**
 * Generates index files for content directories
 */
function generateIndexes() {
  console.log("🔍 Generating index files...\n");

  // Generate notes indexes
  generateNotesIndexes();

  // Generate questions indexes
  generateQuestionsIndexes();

  // Generate solutions indexes
  generateSolutionsIndexes();

  // Generate course indexes
  generateCourseIndexes();

  console.log("\n✅ Index generation completed!");
}

function generateNotesIndexes() {
  const notesDirs = glob.sync("**/content/notes", {
    ignore: ["node_modules/**", ".git/**"],
  });

  notesDirs.forEach((notesDir) => {
    const items = [];
    const noteFolders = glob.sync(`${notesDir}/*/`, {});

    noteFolders.forEach((noteFolder) => {
      const metaPath = path.join(noteFolder, "meta.json");
      if (fs.existsSync(metaPath)) {
        try {
          const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
          items.push({
            id: meta.id,
            slug: path.basename(noteFolder),
            title: meta.title,
            description: meta.description,
            difficulty: meta.difficulty,
            status: meta.status,
            created_by: meta.created_by,
            created_at: meta.created_at,
            path: `${path.basename(noteFolder)}/`,
          });
        } catch (error) {
          console.log(`⚠️  Failed to read ${metaPath}: ${error.message}`);
        }
      }
    });

    const index = {
      content_type: "notes",
      last_updated: new Date().toISOString(),
      total_items: items.length,
      items: items.sort((a, b) => a.title.localeCompare(b.title)),
    };

    const indexPath = path.join(notesDir, "index.json");
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`✅ Generated ${indexPath}`);
  });
}

function generateQuestionsIndexes() {
  const questionsDirs = glob.sync("**/content/questions", {
    ignore: ["node_modules/**", ".git/**"],
  });

  questionsDirs.forEach((questionsDir) => {
    const items = [];
    const examTypes = new Set();
    const years = new Set();

    const questionFiles = glob.sync(`${questionsDir}/**/meta.json`, {});

    questionFiles.forEach((metaPath) => {
      try {
        const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
        if (meta.type === "question") {
          const pathParts = path.dirname(metaPath).split(path.sep);
          const examType = pathParts[pathParts.length - 3];
          const year = pathParts[pathParts.length - 2];

          examTypes.add(examType);
          years.add(year);

          items.push({
            id: meta.id,
            title: meta.title,
            exam_type: examType,
            year: year,
            batch: meta.exam_details?.batch,
            date: meta.exam_details?.date,
            difficulty: meta.difficulty,
            status: meta.status,
            path: path.relative(questionsDir, path.dirname(metaPath)) + "/",
          });
        }
      } catch (error) {
        console.log(`⚠️  Failed to read ${metaPath}: ${error.message}`);
      }
    });

    const index = {
      content_type: "questions",
      last_updated: new Date().toISOString(),
      total_items: items.length,
      exam_types: Array.from(examTypes).sort(),
      years: Array.from(years).sort(),
      items: items.sort((a, b) => a.title.localeCompare(b.title)),
    };

    const indexPath = path.join(questionsDir, "index.json");
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`✅ Generated ${indexPath}`);
  });
}

function generateSolutionsIndexes() {
  const solutionsDirs = glob.sync("**/content/solutions", {
    ignore: ["node_modules/**", ".git/**"],
  });

  solutionsDirs.forEach((solutionsDir) => {
    const items = [];
    const examTypes = new Set();
    const years = new Set();

    const solutionFiles = glob.sync(`${solutionsDir}/**/meta.json`, {});

    solutionFiles.forEach((metaPath) => {
      try {
        const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
        if (meta.type === "solution") {
          const pathParts = path.dirname(metaPath).split(path.sep);
          const examType = pathParts[pathParts.length - 3];
          const year = pathParts[pathParts.length - 2];

          examTypes.add(examType);
          years.add(year);

          items.push({
            id: meta.id,
            title: meta.title,
            question_id: meta.question_id,
            exam_type: examType,
            year: year,
            batch: meta.solution_details?.batch,
            solved_by: meta.solution_details?.solved_by,
            verification_status: meta.solution_details?.verification_status,
            status: meta.status,
            path: path.relative(solutionsDir, path.dirname(metaPath)) + "/",
          });
        }
      } catch (error) {
        console.log(`⚠️  Failed to read ${metaPath}: ${error.message}`);
      }
    });

    const index = {
      content_type: "solutions",
      last_updated: new Date().toISOString(),
      total_items: items.length,
      exam_types: Array.from(examTypes).sort(),
      years: Array.from(years).sort(),
      items: items.sort((a, b) => a.title.localeCompare(b.title)),
    };

    const indexPath = path.join(solutionsDir, "index.json");
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`✅ Generated ${indexPath}`);
  });
}

function generateCourseIndexes() {
  const courseDirs = glob.sync("semesters/*/*/content", {
    ignore: ["node_modules/**", ".git/**"],
  });

  courseDirs.forEach((contentDir) => {
    const courseDir = path.dirname(contentDir);
    const metaPath = path.join(courseDir, "meta.json");

    if (fs.existsSync(metaPath)) {
      try {
        const contentTypes = [
          "notes",
          "questions",
          "solutions",
          "assignments",
          "labs",
          "resources",
        ];
        const summary = {
          last_updated: new Date().toISOString(),
          content_summary: {},
        };

        contentTypes.forEach((type) => {
          const typeDir = path.join(contentDir, type);
          const indexPath = path.join(typeDir, "index.json");

          if (fs.existsSync(indexPath)) {
            const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
            summary.content_summary[type] = {
              total_items: index.total_items || 0,
              last_updated: index.last_updated,
            };
          } else {
            summary.content_summary[type] = {
              total_items: 0,
              last_updated: null,
            };
          }
        });

        const courseIndexPath = path.join(contentDir, "index.json");
        fs.writeFileSync(courseIndexPath, JSON.stringify(summary, null, 2));
        console.log(`✅ Generated ${courseIndexPath}`);
      } catch (error) {
        console.log(
          `⚠️  Failed to generate course index for ${courseDir}: ${error.message}`
        );
      }
    }
  });
}

if (require.main === module) {
  generateIndexes();
}

module.exports = { generateIndexes };
