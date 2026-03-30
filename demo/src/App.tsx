import { MarkdownView } from 'lynx-markdown-it';

import './App.css';

/**
 * Demo markdown content for testing.
 */
const DEMO_MARKDOWN = `# Hello Lynx

This is a **bold** and *italic* text demo.

## Features

- Support heading levels
- Support bullet lists
- Support ordered lists
- Support code blocks

### Code Example

\`\`\`
const greeting = "Hello World";
console.log(greeting);
\`\`\`

> This is a blockquote example

1. First item
2. Second item
3. Third item

---

This is the end of the document.`;

/**
 * Demo application showcasing the MarkdownView component.
 */
export function App() {
  return (
    <scroll-view className="container" scroll-y={true}>
      <view className="content-wrapper">
        {/* Header section */}
        <view className="header-card">
          <text className="header-title">Markdown Renderer Demo</text>
          <view className="status-wrapper">
            <text className="status-text">✅ Testing lynx-markdown-it library</text>
          </view>
        </view>

        {/* Markdown rendering area */}
        <view className="render-card">
          <text className="render-title">Rendered Result:</text>
          <view className="render-content">
            <MarkdownView>{DEMO_MARKDOWN}</MarkdownView>
          </view>
        </view>
      </view>
    </scroll-view>
  );
}
