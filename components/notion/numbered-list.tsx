import { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import React from 'react'
import { RichText } from './rich_text'
import { NotionService } from '@/services/notion.service'
import { renderBlocks } from './blocks-container'


type NumberedListProps = {
  block: NumberedListItemBlockObjectResponse
  nestedLevel: number
}

export const NumberedList = async ({ block, nestedLevel }: NumberedListProps) => {
  const has_children = block.has_children
  if (has_children) {
    const children = await NotionService.getBlocks(block.id)
    return (
      <li className='my-2'>
        <RichText richTexts={block.numbered_list_item.rich_text}></RichText>
        {
          renderBlocks(children, nestedLevel + 1)
        }
      </li>
    )
  }

  return (
    <li className='my-2'>
      <RichText richTexts={block.numbered_list_item.rich_text}></RichText>
    </li>
  )
}
