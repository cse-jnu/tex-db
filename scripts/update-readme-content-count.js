#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function countDirs(dir) {
  return fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => fs.statSync(path.join(dir, f)).isDirectory()).length
    : 0;
}

function countItems(indexPath) {
  if (!fs.existsSync(indexPath)) return 0;
  try {
    const data = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    return Array.isArray(data.items) ? data.items.length : 0;
  } catch {
    return 0;
  }
}

function updateReadme() {
  const semestersDir = path.join("semesters");
  const semesters = fs.existsSync(semestersDir)
    ? fs
        .readdirSync(semestersDir)
        .filter((f) => fs.statSync(path.join(semestersDir, f)).isDirectory())
    : [];
  const semesterCount = semesters.length;

  let courseCount = 0,
    noteCount = 0,
    questionCount = 0,
    solutionCount = 0;
  semesters.forEach((sem) => {
    const semPath = path.join(semestersDir, sem);
    const courses = fs
      .readdirSync(semPath)
      .filter((f) => fs.statSync(path.join(semPath, f)).isDirectory());
    courseCount += courses.length;
    courses.forEach((course) => {
      const base = path.join(semPath, course, "content");
      noteCount += countItems(path.join(base, "notes", "index.json"));
      questionCount += countItems(path.join(base, "questions", "index.json"));
      solutionCount += countItems(path.join(base, "solutions", "index.json"));
    });
  });

  const readmePath = "README.md";
  let readme = fs.readFileSync(readmePath, "utf8");
  const regex = /(### Available Content[\s\S]*?)(- .*)*(?=\n## |$)/;
  const newContent =
    "### Available Content\n" +
    `- **Semesters**: ${semesterCount}\n` +
    `- **Courses**: ${courseCount}\n` +
    `- **Notes**: ${noteCount}\n` +
    `- **Questions**: ${questionCount}\n` +
    `- **Solutions**: ${solutionCount}`;
  if (regex.test(readme)) {
    readme = readme.replace(regex, newContent);
  }
  fs.writeFileSync(readmePath, readme);
  console.log("README.md Available Content section updated.");
}

updateReadme();
