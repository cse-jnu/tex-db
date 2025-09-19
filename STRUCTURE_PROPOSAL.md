# TEX-DB Project Structure

## Overview

A modern, scalable structure for the CSE JnU Question Bank that supports multiple file types and is frontend-friendly.

## Improved Project Structure

```
tex-db/
├── README.md
├── CONTRIBUTING.md
├── package.json                    # For metadata and scripts
├── config/
│   ├── schema.json                 # JSON schemas for validation
│   ├── supported-formats.json      # Supported file formats
│   └── display-config.json         # Frontend display configurations
├── assets/
│   ├── images/                     # Global images
│   ├── icons/                      # Course/semester icons
│   └── templates/                  # File templates for contributors
├── docs/
│   ├── api/                        # API documentation
│   ├── structure-guide.md          # Structure documentation
│   └── contribution-guide.md       # How to contribute
├── scripts/
│   ├── validate.js                 # Validation scripts
│   ├── generate-index.js           # Auto-generate index files
│   └── migrate.js                  # Migration utilities
├── meta.json                       # Root metadata
└── semesters/
    ├── index.json                  # Auto-generated semester index
    ├── meta.json
    └── [semester-slug]/
        ├── index.json              # Auto-generated course index
        ├── meta.json
        └── [course-slug]/
            ├── index.json          # Auto-generated content index
            ├── meta.json           # Course metadata
            ├── content/            # All content files
            │   ├── notes/
            │   │   ├── [note-slug]/
            │   │   │   ├── meta.json
            │   │   │   ├── content.md       # Primary content
            │   │   │   ├── content.tex      # LaTeX version (optional)
            │   │   │   ├── content.pdf      # PDF version (optional)
            │   │   │   └── assets/          # Note-specific assets
            │   │   │       ├── images/
            │   │   │       └── files/
            │   │   └── index.json
            │   ├── questions/
            │   │   ├── [exam-type]/        # midterm, final, quiz, etc.
            │   │   │   ├── [year]/
            │   │   │   │   ├── [question-id]/
            │   │   │   │   │   ├── meta.json
            │   │   │   │   │   ├── question.md
            │   │   │   │   │   ├── question.tex
            │   │   │   │   │   ├── question.pdf
            │   │   │   │   │   └── assets/
            │   │   │   │   └── index.json
            │   │   │   └── index.json
            │   │   └── index.json
            │   ├── solutions/
            │   │   └── [structured same as questions]
            │   ├── assignments/
            │   │   └── [assignment-slug]/
            │   │       ├── meta.json
            │   │       ├── assignment.md
            │   │       ├── solution.md (optional)
            │   │       └── assets/
            │   ├── labs/
            │   │   └── [lab-slug]/
            │   │       ├── meta.json
            │   │       ├── manual.md
            │   │       ├── code/
            │   │       └── assets/
            │   └── resources/              # Additional resources
            │       ├── books/
            │       ├── papers/
            │       └── links.json
            └── assets/                     # Course-specific assets
                ├── images/
                ├── documents/
                └── media/
```

## Key Improvements

### 1. Multi-Format Support

- Primary content in Markdown (`.md`) for better readability
- LaTeX (`.tex`) for mathematical content
- PDF versions for offline access
- JSON for structured data

### 2. Better Organization

- Hierarchical structure with clear categorization
- Separate folders for different content types
- Asset management with dedicated folders

### 3. Enhanced Metadata Structure

```json
{
  "id": "unique-id",
  "title": "Human readable title",
  "description": "Brief description",
  "type": "note|question|solution|assignment|lab",
  "format": "md|tex|pdf|json",
  "difficulty": "easy|medium|hard",
  "topics": ["array", "sorting", "algorithms"],
  "tags": ["important", "frequently-asked"],
  "language": "bn|en",
  "version": "1.0.0",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "created_by": "contributor-name",
  "updated_by": "contributor-name",
  "reviewed_by": "reviewer-name",
  "status": "draft|review|published",
  "dependencies": ["prerequisite-topic-ids"],
  "related_content": ["related-content-ids"],
  "assets": {
    "images": ["image1.png", "image2.jpg"],
    "files": ["data.csv", "code.zip"]
  }
}
```

### 4. Frontend-Friendly Features

- Auto-generated index files for easy navigation
- Consistent API-like structure
- Support for different content formats
- Rich metadata for filtering and searching
- Asset organization for media handling

### 5. Contributor-Friendly Features

- Clear folder structure
- Templates for different content types
- Validation scripts
- Contribution guidelines
- Schema validation
- Automated index generation

## Benefits

1. **Scalability**: Easy to add new semesters, courses, and content types
2. **Flexibility**: Support for multiple file formats
3. **Maintainability**: Clear structure and automated tools
4. **Frontend Integration**: Easy to parse and render
5. **Collaboration**: Clear guidelines and validation tools
6. **Version Control**: Better tracking of changes
7. **Asset Management**: Organized media and file handling
