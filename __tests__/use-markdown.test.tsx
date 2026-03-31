import { describe, it, expect } from 'vitest';
import { renderHook } from '@lynx-js/react/testing-library';
import { useMarkdown } from '../src/use-markdown';

describe('useMarkdown', () => {
  it('should parse heading content', () => {
    const { result } = renderHook(() => useMarkdown('# Hello World'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should return empty tokens for empty string', () => {
    const { result } = renderHook(() => useMarkdown(''));
    expect(result.current.tokens).toEqual([]);
    expect(result.current.error).toBe('');
  });

  it('should parse bold text', () => {
    const { result } = renderHook(() => useMarkdown('**bold text**'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse italic text', () => {
    const { result } = renderHook(() => useMarkdown('*italic text*'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse inline code', () => {
    const { result } = renderHook(() => useMarkdown('`code`'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse code blocks', () => {
    const { result } = renderHook(() => useMarkdown('```\ncode block\n```'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse bullet lists', () => {
    const { result } = renderHook(() => useMarkdown('- item one\n- item two'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse ordered lists', () => {
    const { result } = renderHook(() => useMarkdown('1. first\n2. second'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse blockquotes', () => {
    const { result } = renderHook(() => useMarkdown('> quote text'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse horizontal rules', () => {
    const { result } = renderHook(() => useMarkdown('---'));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse mixed content', () => {
    const markdown = `# Title

This is **bold** and *italic*.

- List item
- Another item

> A quote

---`;

    const { result } = renderHook(() => useMarkdown(markdown));
    expect(result.current.tokens.length).toBeGreaterThan(0);
    expect(result.current.error).toBe('');
  });

  it('should parse all heading levels', () => {
    const markdown = `# H1
## H2
### H3
#### H4
##### H5
###### H6`;

    const { result } = renderHook(() => useMarkdown(markdown));
    const headingOpens = result.current.tokens.filter(
      (t) => t.type === 'heading_open',
    );
    expect(headingOpens.length).toBe(6);
  });

  it('should handle special characters', () => {
    const { result } = renderHook(() => useMarkdown('Hello & <world> "quotes"'));
    expect(result.current.error).toBe('');
  });
});
