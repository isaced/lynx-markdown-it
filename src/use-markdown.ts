import { useState, useEffect } from '@lynx-js/react';
import MarkdownIt from 'markdown-it';
import type { Token } from './types';

/**
 * Hook result containing parsed tokens and error state.
 */
interface UseMarkdownResult {
  /** Array of parsed markdown tokens */
  tokens: Token[];
  /** Error message if parsing failed, empty string otherwise */
  error: string;
}

/**
 * Hook to parse markdown content into tokens using markdown-it.
 *
 * @param markdown - The markdown content to parse
 * @returns Object containing parsed tokens and error state
 *
 * @example
 * ```tsx
 * const { tokens, error } = useMarkdown('# Hello World');
 * ```
 */
export function useMarkdown(markdown: string): UseMarkdownResult {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const md = new MarkdownIt();
      const parsedTokens = md.parse(markdown, {});

      setTokens(parsedTokens);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
    }
  }, [markdown]);

  return { tokens, error };
}
