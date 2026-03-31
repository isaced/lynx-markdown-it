import { describe, it, expect } from 'vitest';
import { render } from '@lynx-js/react/testing-library';
import { RenderTokens } from '../src/tokens-renderer';
import { useMarkdown } from '../src/use-markdown';
import { useState, useEffect } from '@lynx-js/react';

/**
 * Helper component to render tokens from a markdown string.
 * Uses useMarkdown to parse tokens, then passes them to RenderTokens.
 */
function TestRenderTokens({ markdown }: { markdown: string }) {
  const { tokens } = useMarkdown(markdown);
  return (
    <view>
      <RenderTokens tokens={tokens} />
    </view>
  );
}

describe('RenderTokens', () => {
  it('should render heading tokens', () => {
    const { container } = render(<TestRenderTokens markdown="# Hello" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render paragraph tokens', () => {
    const { container } = render(<TestRenderTokens markdown="Some text" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render code block tokens', () => {
    const { container } = render(
      <TestRenderTokens markdown={'```\ncode\n```'} />,
    );
    const codeBlock = container.querySelector('.md-code-block');
    expect(codeBlock).toBeTruthy();
  });

  it('should render bullet list tokens', () => {
    const { container } = render(
      <TestRenderTokens markdown="- item\n- item2" />,
    );
    const list = container.querySelector('.md-list');
    expect(list).toBeTruthy();
  });

  it('should render ordered list tokens', () => {
    const { container } = render(
      <TestRenderTokens markdown="1. first\n2. second" />,
    );
    const list = container.querySelector('.md-list');
    expect(list).toBeTruthy();
  });

  it('should render blockquote tokens', () => {
    const { container } = render(
      <TestRenderTokens markdown="> quoted" />,
    );
    const blockquote = container.querySelector('.md-blockquote');
    expect(blockquote).toBeTruthy();
  });

  it('should render horizontal rule tokens', () => {
    const { container } = render(<TestRenderTokens markdown="---" />);
    const hr = container.querySelector('.md-hr');
    expect(hr).toBeTruthy();
  });

  it('should handle empty tokens', () => {
    const EmptyRender = () => {
      return (
        <view>
          <RenderTokens tokens={[]} />
        </view>
      );
    };
    const { container } = render(<EmptyRender />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should apply inline code class', () => {
    const { container } = render(
      <TestRenderTokens markdown="Use `code` here" />,
    );
    const inlineCode = container.querySelector('.md-inline-code');
    expect(inlineCode).toBeTruthy();
  });

  it('should apply bold class', () => {
    const { container } = render(
      <TestRenderTokens markdown="**bold** text" />,
    );
    const bold = container.querySelector('.md-bold');
    expect(bold).toBeTruthy();
  });

  it('should apply italic class', () => {
    const { container } = render(
      <TestRenderTokens markdown="*italic* text" />,
    );
    const italic = container.querySelector('.md-italic');
    expect(italic).toBeTruthy();
  });

  it('should apply bold-italic class', () => {
    const { container } = render(
      <TestRenderTokens markdown="***bold italic*** text" />,
    );
    const boldItalic = container.querySelector('.md-bold-italic');
    expect(boldItalic).toBeTruthy();
  });
});
