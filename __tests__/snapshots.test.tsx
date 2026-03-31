import { describe, it, expect } from 'vitest';
import { render } from '@lynx-js/react/testing-library';
import { MarkdownView } from '../src/index';

describe('Snapshot tests', () => {
  it('should match snapshot for headings', () => {
    const { container } = render(<MarkdownView># Hello World</MarkdownView>);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for bold and italic', () => {
    const { container } = render(
      <MarkdownView>This is **bold** and *italic* text.</MarkdownView>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for code block', () => {
    const { container } = render(
      <MarkdownView>{'```\nconst x = 1;\n```'}</MarkdownView>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for bullet list', () => {
    const { container } = render(
      <MarkdownView>{'- item one\n- item two\n- item three'}</MarkdownView>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for ordered list', () => {
    const { container } = render(
      <MarkdownView>{'1. first\n2. second\n3. third'}</MarkdownView>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for blockquote', () => {
    const { container } = render(
      <MarkdownView>{'> This is a quote'}</MarkdownView>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for horizontal rule', () => {
    const { container } = render(<MarkdownView>---</MarkdownView>);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for full document', () => {
    const markdown = `# Hello World

This is a **bold** and *italic* text demo.

## Features

- Support heading levels
- Support bullet lists
- Support \`inline code\`

> This is a blockquote

1. First item
2. Second item

---

End of document.`;

    const { container } = render(<MarkdownView>{markdown}</MarkdownView>);
    expect(container).toMatchSnapshot();
  });
});
