import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import React from 'react'
import { RichText } from './rich_text';
import { BLOCK_TYPES } from '@/lib/notion/types';

interface TextProps {
  block: BlockObjectResponse
}

export const Text: React.FC<TextProps> = ({ block }: TextProps) => {
  switch (block.type) {
    case BLOCK_TYPES.TOGGLE:
      return <div><RichText richTexts={block.toggle.rich_text} className="inline text-base/6 sm:text-sm/6"></RichText></div>
    case BLOCK_TYPES.PARAGRAPH:
      return <div><RichText richTexts={block.paragraph.rich_text} className='text-base/6 sm:text-sm/6' ></RichText></div>
    case BLOCK_TYPES.HEADING_1:
      return <h1 data-outline="heading_1" className='mt-[1em]'  id={block.id}><RichText  richTexts={block.heading_1.rich_text}></RichText></h1>;
    case BLOCK_TYPES.HEADING_2:
      return <h2 data-outline="heading_2"  id={block.id} ><RichText  richTexts={block.heading_2.rich_text}></RichText></h2>;
    case BLOCK_TYPES.HEADING_3:
      return <h3 data-outline="heading_3"  id={block.id} ><RichText  richTexts={block.heading_3.rich_text}></RichText></h3>;
    default:
      return null;
  }
}
