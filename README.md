# lynx-markdown-it

A [Lynx](https://lynxjs.org) component library for rendering Markdown content using [markdown-it](https://github.com/markdown-it/markdown-it).

## Installation

```bash
npm install lynx-markdown-it
```

## Usage

### MarkdownView Component

```tsx
import { MarkdownView } from 'lynx-markdown-it';

function App() {
  return (
    <MarkdownView>
      {`# Hello World

This is a **bold** and *italic* text demo.

## Features

- Support heading levels
- Support bullet lists
- Support \`inline code\`

> This is a blockquote

1. First item
2. Second item

---

End of document.`}
    </MarkdownView>
  );
}
```

## Supported Elements

| Element | Syntax |
|---------|--------|
| Headings | `# H1` `## H2` ... `###### H6` |
| Paragraph | Plain text |
| **Bold** | `**text**` |
| *Italic* | `*text*` |
| ***Bold Italic*** | `***text***` |
| `Inline Code` | `` `code` `` |
| Code Block | ` ```code``` ` |
| Bullet List | `- item` |
| Ordered List | `1. item` |
| Blockquote | `> text` |
| Horizontal Rule | `---` |

## API

### `MarkdownView`

The main component for rendering markdown content.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `string` | ✅ | Markdown content string to render |

```tsx
import { MarkdownView } from 'lynx-markdown-it';

<MarkdownView>{markdownString}</MarkdownView>
```

## Styling

The library ships with default CSS styles. All elements use CSS class names prefixed with `md-` for easy customization:

| Class | Element |
|-------|---------|
| `.md-heading`, `.md-heading-1` ~ `.md-heading-6` | Headings |
| `.md-paragraph` | Paragraph |
| `.md-bold` | Bold text |
| `.md-italic` | Italic text |
| `.md-bold-italic` | Bold + italic text |
| `.md-inline-code` | Inline code |
| `.md-code-block`, `.md-code-text` | Code block |
| `.md-list`, `.md-list-item` | List container and items |
| `.md-list-bullet` | Bullet list item |
| `.md-list-number` | Ordered list item |
| `.md-blockquote`, `.md-blockquote-text` | Blockquote |
| `.md-hr` | Horizontal rule |
| `.md-error` | Error message |

## License

MIT
