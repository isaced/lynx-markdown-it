import { describe, it, expect } from 'vitest';
import { render, screen } from '@lynx-js/react/testing-library';
import { MarkdownView } from '../src/index';

describe('MarkdownView', () => {
  it('should render heading content', () => {
    const { container } = render(<MarkdownView># Hello World</MarkdownView>);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('should render bold text', () => {
    const { container } = render(<MarkdownView>**bold text**</MarkdownView>);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render italic text', () => {
    const { container } = render(<MarkdownView>*italic text*</MarkdownView>);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render inline code', () => {
    const { container } = render(<MarkdownView>`code`</MarkdownView>);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render code blocks', () => {
    const { container } = render(
      <MarkdownView>{'```\ncode block\n```'}</MarkdownView>,
    );
    expect(container.firstChild).toBeTruthy();
    const codeBlock = container.querySelector('.md-code-block');
    expect(codeBlock).toBeTruthy();
  });

  it('should render bullet lists', () => {
    const { container } = render(
      <MarkdownView>{'- item one\n- item two'}</MarkdownView>,
    );
    expect(container.firstChild).toBeTruthy();
    const list = container.querySelector('.md-list');
    expect(list).toBeTruthy();
  });

  it('should render ordered lists', () => {
    const { container } = render(
      <MarkdownView>{'1. first\n2. second'}</MarkdownView>,
    );
    expect(container.firstChild).toBeTruthy();
    const list = container.querySelector('.md-list');
    expect(list).toBeTruthy();
  });

  it('should render blockquotes', () => {
    const { container } = render(
      <MarkdownView>{'> quote text'}</MarkdownView>,
    );
    expect(container.firstChild).toBeTruthy();
    const blockquote = container.querySelector('.md-blockquote');
    expect(blockquote).toBeTruthy();
  });

  it('should render horizontal rules', () => {
    const { container } = render(<MarkdownView>---</MarkdownView>);
    expect(container.firstChild).toBeTruthy();
    const hr = container.querySelector('.md-hr');
    expect(hr).toBeTruthy();
  });

  it('should apply correct heading class', () => {
    const { container } = render(<MarkdownView># Heading One</MarkdownView>);
    const heading = container.querySelector('.md-heading.md-heading-1');
    expect(heading).toBeTruthy();
  });

  it('should apply correct paragraph class', () => {
    const { container } = render(<MarkdownView>Some paragraph text.</MarkdownView>);
    const paragraph = container.querySelector('.md-paragraph');
    expect(paragraph).toBeTruthy();
  });

  it('should render all heading levels with correct classes', () => {
    const markdown = `# H1
## H2
### H3
#### H4
##### H5
###### H6`;

    const { container } = render(<MarkdownView>{markdown}</MarkdownView>);

    for (let i = 1; i <= 6; i++) {
      const heading = container.querySelector(`.md-heading-${i}`);
      expect(heading).toBeTruthy();
    }
  });

  it('should render bullet list items with correct class', () => {
    const { container } = render(
      <MarkdownView>{'- item one\n- item two'}</MarkdownView>,
    );
    const bulletItems = container.querySelectorAll('.md-list-item');
    expect(bulletItems.length).toBe(2);
  });

  it('should render mixed content correctly', () => {
    const markdown = `# Title

This is **bold** and *italic*.

- List item
- Another item

> A quote

---`;

    const { container } = render(<MarkdownView>{markdown}</MarkdownView>);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });
});
