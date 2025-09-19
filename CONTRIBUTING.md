# Contributing to TEX-DB

Thank you for your interest in contributing to the CSE JnU Question Bank! This document provides guidelines and instructions for contributors.

## 🎯 How to Contribute

### Types of Contributions

- **Study Notes**: Educational content and explanations
- **Exam Questions**: Past exam questions and practice problems
- **Solutions**: Step-by-step solutions to problems
- **Assignments**: Course assignments and projects
- **Lab Manuals**: Laboratory experiments and guides
- **Resources**: Additional learning materials

## 📋 Before You Start

### Prerequisites

1. **Git** knowledge (basic clone, commit, push)
2. **Markdown** writing skills
3. **JSON** basic understanding
4. Familiarity with the **course content** you're contributing to

### Setup Your Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR-USERNAME/tex-db.git
cd tex-db

# Add upstream remote
git remote add upstream https://github.com/cse-jnu/tex-db.git

# Create a new branch
git checkout -b feature/your-contribution-name
```

### Branch Naming Convention

- When contributing, please name your branch using your university ID (e.g., `B210305040`).
- Example:
  ```bash
  git checkout -b B210305040
  ```
- This helps maintainers track contributions and ensures clarity in the repository.

## 📝 Content Guidelines

### 1. Content Structure

#### For Notes

```
content/notes/[note-slug]/
├── meta.json          # Metadata
├── content.md         # Primary content (Markdown)
├── content.tex        # LaTeX version (optional)
├── content.pdf        # PDF version (optional)
└── assets/           # Images, files, etc.
    ├── images/
    └── files/
```

#### For Questions

```
content/questions/[exam-type]/[year]/[question-id]/
├── meta.json          # Metadata
├── question.md        # Question content
├── question.tex       # LaTeX version (optional)
├── question.pdf       # PDF version (optional)
└── assets/           # Supporting files
```

#### For Solutions

```
content/solutions/[exam-type]/[year]/[question-id]/
├── meta.json          # Metadata
├── solution.md        # Solution content
├── solution.tex       # LaTeX version (optional)
├── solution.pdf       # PDF version (optional)
└── assets/           # Supporting files
```

### 2. Metadata Requirements

Every content item must have a `meta.json` file with the following structure:

```json
{
  "id": "unique-identifier",
  "title": "Human Readable Title",
  "description": "Brief description of content",
  "type": "note|question|solution|assignment|lab",
  "format": "md|tex|pdf",
  "difficulty": "easy|medium|hard",
  "topics": ["topic1", "topic2"],
  "tags": ["tag1", "tag2"],
  "language": "en",
  "version": "1.0.0",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "created_by": "Your Name",
  "status": "draft|review|published",
  "dependencies": [],
  "related_content": [],
  "assets": {
    "images": [],
    "files": []
  }
}
```

### 3. Writing Guidelines

#### Markdown Format

- Use **English** for all content
- Include proper headings (`#`, `##`, `###`)
- Use code blocks for code snippets
- Add tables for structured data
- Include mathematical equations using LaTeX syntax

#### Content Quality

- **Accurate**: Ensure technical correctness
- **Clear**: Write in simple, understandable language
- **Complete**: Cover the topic comprehensively
- **Consistent**: Follow established formatting patterns

#### Example Note Structure

```markdown
# Topic Title

## Overview

Brief introduction to the topic.

## Main Content

### Subtopic 1

Detailed explanation...

### Subtopic 2

Detailed explanation...

## Examples
```

Code or examples

```

## Practice Problems
1. Question 1
2. Question 2

## References
- Book/Website names
```

### 4. Naming Conventions

#### File and Folder Names

- Use **kebab-case** (lowercase with hyphens)
- Be **descriptive** but **concise**
- Use **English** for folder/file names
- Examples: `data-structures`, `sorting-algorithms`, `binary-trees`

#### ID Conventions

- **Notes**: `[course-code]-[topic-slug]`
- **Questions**: `[batch][exam-type][number]` (e.g., `B12M1`, `B15F2`)
- **Solutions**: `[question-id]-solution`

### 5. Asset Management

#### Images

- Use **PNG** or **JPEG** format
- Optimize file sizes (< 1MB preferred)
- Use descriptive filenames
- Place in appropriate `assets/images/` folder

#### Files

- Support common formats: PDF, DOCX, XLSX, ZIP
- Keep file sizes reasonable (< 10MB)
- Include clear descriptions in metadata

## 🔍 Quality Assurance

### Before Submitting

1. **Validate JSON**: Ensure all JSON files are valid
2. **Check Links**: Verify all internal references work
3. **Review Content**: Proofread for accuracy and clarity
4. **Test Rendering**: Ensure Markdown renders correctly
5. **Update Indexes**: Regenerate index files if needed

### Review Process

1. **Automated Checks**: JSON validation, structure compliance
2. **Content Review**: Technical accuracy, language quality
3. **Integration Testing**: Ensure compatibility with existing content

## 📤 Submission Process

### Step-by-Step

1. **Create Branch**

   ```bash
   git checkout -b feature/add-[content-type]-[topic]
   ```

2. **Add Content**

   - Create folder structure
   - Add meta.json with complete metadata
   - Write content in Markdown
   - Add any necessary assets

3. **Validate**

   ```bash
   # Validate JSON syntax
   npm run validate-json

   # Check structure compliance
   npm run check-structure
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "Add [content-type]: [brief description]"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/add-[content-type]-[topic]
   ```
   Then create a Pull Request on GitHub.

### Commit Message Format

```
[type]: [brief description]

[detailed description if needed]

Closes #[issue-number] (if applicable)
```

**Types**: `add`, `update`, `fix`, `docs`, `style`, `refactor`

**Examples**:

- `add: Data Structures notes for CSE-1201`
- `update: Batch 15 final exam questions`
- `fix: Correct solution for sorting algorithm`

## ✅ Validation Scripts

### Available Scripts

```bash
# Validate all JSON files
npm run validate

# Check structure compliance
npm run check-structure

# Generate/update index files
npm run generate-index

# Lint Markdown files
npm run lint-md

# Full validation suite
npm run validate-all
```

## 🎨 Templates

### Note Template

Use this template when creating new notes:

```markdown
# [Topic Title]

## Overview

[Brief overview of the topic]

## Learning Objectives

After studying this note, you will be able to:

- [Objective 1]
- [Objective 2]

## Main Content

[Detailed content with proper headings]

## Examples

[Practical examples]

## Practice Problems

[Practice questions]

## Summary

[Key points summary]

## References

[References and further reading]
```

### Question Template

```markdown
# [Exam Title] - [Course Name]

**Course:** [Course Code] [Course Name]  
**Exam Type:** [Midterm/Final/Quiz]  
**Batch:** [Batch Number]  
**Date:** [Date]  
**Duration:** [Duration]  
**Total Marks:** [Total Marks]

---

## Instructions

- [Instruction 1]
- [Instruction 2]

## Questions

### Question 1 ([Marks] marks)

[Question content]

### Question 2 ([Marks] marks)

[Question content]

---
```

## 🐛 Issue Reporting

### When to Report Issues

- **Content errors**: Incorrect information, typos
- **Structural problems**: Broken links, missing files
- **Metadata issues**: Wrong categorization, missing tags
- **Technical bugs**: Validation failures, format issues

### How to Report

1. **Search existing issues** first
2. **Use issue templates** when available
3. **Provide detailed description**
4. **Include steps to reproduce** (for bugs)
5. **Add relevant labels**

## 💬 Community Guidelines

### Code of Conduct

- **Be respectful** to all contributors
- **Provide constructive feedback**
- **Welcome newcomers** and help them learn
- **Focus on the content**, not the person
- **Follow academic integrity** principles

### Communication

- Use **clear, professional language**
- **Ask questions** when uncertain
- **Share knowledge** and help others
- **Acknowledge contributions** of others

## 🏆 Recognition

### Contributor Levels

- **Contributor**: Made at least one accepted contribution
- **Regular Contributor**: 5+ accepted contributions
- **Course Maintainer**: Maintains content for specific courses
- **Project Maintainer**: Overall project maintenance

### Benefits

- **Recognition** in project documentation
- **Contributor badge** on profile
- **Priority support** for issues and questions
- **Input in project direction** decisions

## 📞 Getting Help

### Resources

- **Documentation**: Read the full project documentation
- **Issues**: Search existing issues for solutions
- **Discussions**: Join community discussions
- **Direct Contact**: Reach out to maintainers

### Contact Information

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions
- **Email**: contact.ahsanul@gmail.com

---

**Thank you for contributing to TEX-DB! Your efforts help fellow students succeed in their academic journey.** 🎓

## 🛠️ Automated Index Generation (CI/CD)

This project uses GitHub Actions to automatically generate and validate all `index.json` files on every pull request to the `main` branch.

- You **do not have to** manually update `index.json` files.
- If you want to check locally, run:
  ```bash
  npm run generate-index
  ```
- The CI/CD pipeline will:
  1. Install dependencies
  2. Run `npm run generate-index` and `npm run validate`
  3. Auto-commit any changes to `index.json` if needed

**Workflow file:** `.github/workflows/generate-index.yml`

---
