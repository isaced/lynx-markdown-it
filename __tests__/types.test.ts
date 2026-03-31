import { describe, it, expect } from 'vitest';
import MarkdownIt from 'markdown-it';

describe('Token type', () => {
  it('should accept markdown-it token shape', () => {
    const md = new MarkdownIt();
    const tokens = md.parse('# Hello', {});
    const token = tokens[0];

    expect(token.type).toBe('heading_open');
    expect(token.tag).toBe('h1');
    expect(token.nesting).toBe(1);
    expect(token.block).toBe(true);
    expect(token.markup).toBe('#');
  });

  it('should accept token with children', () => {
    const md = new MarkdownIt();
    const tokens = md.parse('Hello **world**', {});
    const inlineToken = tokens.find((t) => t.type === 'inline')!;

    expect(inlineToken.children).toBeDefined();
    expect(Array.isArray(inlineToken.children)).toBe(true);
    expect(inlineToken.children!.length).toBeGreaterThan(0);
  });

  it('should have expected token properties', () => {
    const md = new MarkdownIt();
    const tokens = md.parse('# Test', {});
    const token = tokens[0];

    expect(token).toHaveProperty('type');
    expect(token).toHaveProperty('tag');
    expect(token).toHaveProperty('attrs');
    expect(token).toHaveProperty('map');
    expect(token).toHaveProperty('nesting');
    expect(token).toHaveProperty('level');
    expect(token).toHaveProperty('children');
    expect(token).toHaveProperty('content');
    expect(token).toHaveProperty('markup');
    expect(token).toHaveProperty('info');
    expect(token).toHaveProperty('meta');
    expect(token).toHaveProperty('block');
    expect(token).toHaveProperty('hidden');
  });
});
