import type { Token } from './types';
import './styles.css';

/**
 * Props for the RenderTokens component.
 */
interface RenderTokensProps {
  /** Array of markdown tokens to render */
  tokens: Token[];
  /** Starting index for token processing (default: 0) */
  startIndex?: number;
}

/**
 * Recursively renders markdown tokens as Lynx components.
 * 
 * @param props - Component props containing tokens and optional start index
 * @returns React elements representing the rendered markdown content
 */
export const RenderTokens = ({ tokens, startIndex = 0 }: RenderTokensProps) => {
  const elements: any[] = [];
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];

    switch (token.type) {
      case 'heading_open': {
        const level = parseInt(token.tag.slice(1));
        
        const closeIdx = tokens.findIndex((t, idx) => idx > i && t.type === 'heading_close');
        const contentTokens = tokens.slice(i + 1, closeIdx);
        
        let textContent = '';
        contentTokens.forEach(t => {
          if (t.type === 'inline') {
            textContent += t.content;
          }
        });
        
        elements.push(
          <text key={i} className={`md-heading md-heading-${level}`}>
            {textContent}
          </text>
        );
        i = closeIdx + 1;
        break;
      }

      case 'paragraph_open': {
        const closeIdx = tokens.findIndex((t, idx) => idx > i && t.type === 'paragraph_close');
        const contentTokens = tokens.slice(i + 1, closeIdx);
        
        let textContent = '';
        contentTokens.forEach(t => {
          if (t.type === 'inline') {
            textContent += t.content;
          }
        });
        
        elements.push(
          <text key={i} className="md-paragraph">
            {textContent}
          </text>
        );
        i = closeIdx + 1;
        break;
      }

      case 'bullet_list_open': {
        const closeIdx = tokens.findIndex((t, idx) => idx > i && t.type === 'bullet_list_close');
        const listItems: any[] = [];
        
        for (let j = i + 1; j < closeIdx; j++) {
          if (tokens[j].type === 'list_item_open') {
            const itemCloseIdx = tokens.findIndex((t, idx) => idx > j && t.type === 'list_item_close');
            const itemContentTokens = tokens.slice(j + 1, itemCloseIdx);
            
            let itemText = '';
            itemContentTokens.forEach(t => {
              if (t.type === 'inline') {
                itemText += t.content;
              }
            });
            
            listItems.push(
              <view key={j} className="md-list-item">
                <text className="md-list-bullet">• {itemText}</text>
              </view>
            );
            j = itemCloseIdx;
          }
        }
        
        elements.push(
          <view key={i} className="md-list">
            {listItems}
          </view>
        );
        i = closeIdx + 1;
        break;
      }

      case 'ordered_list_open': {
        const closeIdx = tokens.findIndex((t, idx) => idx > i && t.type === 'ordered_list_close');
        const listItems: any[] = [];
        let itemIndex = 1;
        
        for (let j = i + 1; j < closeIdx; j++) {
          if (tokens[j].type === 'list_item_open') {
            const itemCloseIdx = tokens.findIndex((t, idx) => idx > j && t.type === 'list_item_close');
            const itemContentTokens = tokens.slice(j + 1, itemCloseIdx);
            
            let itemText = '';
            itemContentTokens.forEach(t => {
              if (t.type === 'inline') {
                itemText += t.content;
              }
            });
            
            listItems.push(
              <view key={j} className="md-list-item">
                <text className="md-list-number">{itemIndex}. {itemText}</text>
              </view>
            );
            itemIndex++;
            j = itemCloseIdx;
          }
        }
        
        elements.push(
          <view key={i} className="md-list">
            {listItems}
          </view>
        );
        i = closeIdx + 1;
        break;
      }

      case 'code_block':
      case 'fence': {
        elements.push(
          <view key={i} className="md-code-block">
            <text className="md-code-text">
              {token.content}
            </text>
          </view>
        );
        i++;
        break;
      }

      case 'blockquote_open': {
        const closeIdx = tokens.findIndex((t, idx) => idx > i && t.type === 'blockquote_close');
        const quoteTokens = tokens.slice(i + 1, closeIdx);
        
        let quoteText = '';
        quoteTokens.forEach(t => {
          if (t.type === 'paragraph_open') {
            const pCloseIdx = quoteTokens.findIndex((pt, idx) => idx > quoteTokens.indexOf(t) && pt.type === 'paragraph_close');
            const pContentTokens = quoteTokens.slice(quoteTokens.indexOf(t) + 1, pCloseIdx);
            pContentTokens.forEach(ct => {
              if (ct.type === 'inline') {
                quoteText += ct.content;
              }
            });
          }
        });
        
        elements.push(
          <view key={i} className="md-blockquote">
            <text className="md-blockquote-text">
              {quoteText}
            </text>
          </view>
        );
        i = closeIdx + 1;
        break;
      }

      case 'hr': {
        elements.push(
          <view key={i} className="md-hr" />
        );
        i++;
        break;
      }

      default:
        i++;
        break;
    }
  }

  return <>{elements}</>;
};
