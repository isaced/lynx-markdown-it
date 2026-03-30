import MarkdownIt from 'markdown-it';

/**
 * Represents a markdown-it token used for parsing markdown content.
 */
export type Token = ReturnType<InstanceType<typeof MarkdownIt>['parse']>[number];
