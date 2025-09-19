#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");

function getMergedPRs() {
  // Get merged PRs with branch, author, date, and title
  // Only works if PRs are merged via GitHub (not direct push)
  const log = execSync(
    'git log --merges --pretty=format:"%ad|%an|%s" --date=short',
    { encoding: "utf8" }
  );
  const lines = log.split("\n");
  const prs = [];
  for (const line of lines) {
    // PR merge commit message format: Merge pull request #123 from branch
    const match = line.match(
      /^(\d{4}-\d{2}-\d{2})\|([^|]+)\|Merge pull request #\d+ from ([^ ]+)\s*(.*)$/
    );
    if (match) {
      const [, date, name, branch, rest] = match;
      // Try to get PR title from the rest of the message or fallback
      const brief = rest.trim() || "No description";
      prs.push({ date, name, branch, brief });
    }
  }
  return prs;
}

function updateContributors() {
  const prs = getMergedPRs();
  const tableRows = prs
    .map((pr) => `| ${pr.date} | ${pr.name} | ${pr.branch} | ${pr.brief} |`)
    .join("\n");
  const file = "CONTRIBUTORS.md";
  let content = fs.readFileSync(file, "utf8");
  content = content.replace(
    /<!-- CONTRIBUTORS-TABLE-START -->([\s\S]*?)<!-- CONTRIBUTORS-TABLE-END -->/,
    `<!-- CONTRIBUTORS-TABLE-START -->\n${tableRows}\n<!-- CONTRIBUTORS-TABLE-END -->`
  );
  fs.writeFileSync(file, content);
  console.log("CONTRIBUTORS.md updated.");
}

updateContributors();
