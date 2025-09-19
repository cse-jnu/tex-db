# TEX-DB - CSE JnU Question Bank

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/cse-jnu/tex-db)

A comprehensive, modern question bank and study resource platform for Computer Science and Engineering students at Jagannath University (JnU).

## 🚀 Features

- **Multi-format Support**: Markdown, LaTeX, PDF, and JSON files
- **Rich Metadata**: Detailed information for better organization and search
- **Frontend-friendly**: Structured JSON APIs for easy integration
- **Version Control**: Track changes and contributions
- **Asset Management**: Support for images, documents, and media files
- **Contributor-friendly**: Clear guidelines and automated validation

## 📁 Project Structure

```
tex-db/
├── meta.json                       # Project metadata
├── config/                         # Configuration files
│   ├── schema.json                # JSON schemas
│   └── supported-formats.json     # Supported file formats
├── semesters/
│   └── [semester-slug]/
│       └── [course-slug]/
│           ├── meta.json          # Course metadata
│           └── content/           # All course content
│               ├── notes/         # Study notes
│               ├── questions/     # Exam questions
│               ├── solutions/     # Solutions
│               ├── assignments/   # Course assignments
│               ├── labs/          # Lab manuals
│               └── resources/     # Additional resources
└── assets/                        # Global assets
```

## 🎯 Content Types

| Type            | Description                  | Primary Format |
| --------------- | ---------------------------- | -------------- |
| **Notes**       | Study notes and explanations | Markdown       |
| **Questions**   | Past exam questions          | Markdown       |
| **Solutions**   | Step-by-step solutions       | Markdown       |
| **Assignments** | Course assignments           | Markdown       |
| **Labs**        | Laboratory manuals           | Markdown       |
| **Resources**   | Additional materials         | Various        |

## 📝 Quick Start

### For Contributors

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a new branch for your contribution
4. **Add** your content following the structure guidelines
5. **Validate** your content using provided scripts
6. **Submit** a pull request

### Adding New Content

#### Adding a Note

```bash
# Create directory structure
mkdir -p semesters/[semester]/[course]/content/notes/[note-slug]

# Add metadata
# Edit: semesters/[semester]/[course]/content/notes/[note-slug]/meta.json

# Add content
# Edit: semesters/[semester]/[course]/content/notes/[note-slug]/content.md
```

#### Adding Questions

```bash
# Create directory structure
mkdir -p semesters/[semester]/[course]/content/questions/[exam-type]/[year]/[question-id]

# Add metadata and content
# Edit respective meta.json and question.md files
```

## 🛠️ Development

### Prerequisites

- Node.js (for validation scripts)
- Git

### Validation

```bash
# Validate all JSON files
npm run validate

# Generate index files
npm run generate-index

# Check structure compliance
npm run check-structure
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

### Content Guidelines

- Use **Markdown** as the primary format
- Include proper **metadata** in meta.json files
- Follow the **naming conventions**
- Add **descriptive commit messages**
- Test your content before submitting

### Supported Languages

- **English**: Primary language for all content and documentation

## 📊 Current Status

### Available Content

- **Semesters**: 1
- **Courses**: 1
- **Notes**: 1
- **Questions**: 1
- **Solutions**: 1

### Recent Updates

- ✅ Migrated to version 2.0 structure
- ✅ Added multi-format support
- ✅ Implemented rich metadata system
- ✅ Created validation schemas

## 🔄 Migration from v1.x

The project has been migrated from the legacy structure to a more scalable and frontend-friendly format. Legacy `.tex` files are preserved and referenced in metadata.

### Key Changes

- **Structure**: Hierarchical organization with content types
- **Formats**: Primary support for Markdown with LaTeX as secondary
- **Metadata**: Rich metadata for better categorization
- **Assets**: Dedicated asset management system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Lionel Messi** - Initial content contributor
- **Md. Al-Amin Bhuiyan** - Solutions and review

## 📞 Support

For questions or support:

- Create an [Issue](https://github.com/cse-jnu/tex-db/issues)
- Contact the maintainers
- Join our community discussions

---

**Made with ❤️ for CSE JnU students**
