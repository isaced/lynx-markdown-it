import { RenderTokens } from './tokens-renderer';
import { useMarkdown } from './use-markdown';
import type { Token } from './types';
import './styles.css';

/**
 * Props for the MarkdownView component.
 */
export interface MarkdownViewProps {
  /** Markdown content string to render as children */
  children: string;
}

/**
 * A Lynx component that renders markdown content.
 * 
 * @param props - Component props
 * @param props.children - Markdown content string to render
 * @returns React element rendering the markdown content
 * 
 * @example
 * ```tsx
 * <MarkdownView># Hello World</MarkdownView>
 * ```
 */
export function MarkdownView({ children }: MarkdownViewProps) {
  const { tokens } = useMarkdown(children);

  return (
    <view>
      <RenderTokens tokens={tokens} />
    </view>
  );
}

export type { Token };
