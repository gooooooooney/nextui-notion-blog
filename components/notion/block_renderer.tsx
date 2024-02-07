import { BLOCK_TYPES } from '@/lib/notion/types'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import React from 'react'
import { Text } from './text'
import Callout from './callout'
import BlockQuote from './block-quote'
import { BulletedList } from './bulleted-list'
import { NumberedList } from './numbered-list'
import { Code } from './code/code'
import { RenderImage } from './render-image/image'
import { Video } from '../video/video'
import { getMediaUrl } from '@/lib/notion/guard/block-guard'
// import { FadeIn } from '../FadeIn'

type BlockRendererProps = {
  block: BlockObjectResponse
  nestedLevel?: number
}



export const BlockRenderer = ({ block, nestedLevel }: BlockRendererProps) => {


  return (
    <>
      {
        (() => {
          switch (block.type) {
            case BLOCK_TYPES.HEADING_3:
            case BLOCK_TYPES.HEADING_2:
            case BLOCK_TYPES.HEADING_1:
            case BLOCK_TYPES.TOGGLE:
            case BLOCK_TYPES.PARAGRAPH:
              return <Text block={block} />
            case BLOCK_TYPES.BULLETED_LIST_ITEM:
              {/* @ts-expect-error Async Server Component */ }
              return <BulletedList nestedLevel={nestedLevel} block={block} />
            case BLOCK_TYPES.NUMBERED_LIST_ITEM:
              {/* @ts-expect-error Async Server Component */ }
              return <NumberedList nestedLevel={nestedLevel} block={block} />
            case BLOCK_TYPES.CODE:
              return <Code block={block} />
            case BLOCK_TYPES.QUOTE:
              return <BlockQuote block={block} />
            case BLOCK_TYPES.CALLOUT:
              return <Callout block={block} />
            case BLOCK_TYPES.IMAGE:
              return <RenderImage block={block} />
            case BLOCK_TYPES.VIDEO:
              return <Video source={getMediaUrl(block.video)} />
            case BLOCK_TYPES.DIVIDER:
              return <hr />
            case BLOCK_TYPES.TO_DO:
              return <div>to do</div>
            case BLOCK_TYPES.CHILD_PAGE:
              return <div>child page</div>
            case BLOCK_TYPES.CHILD_DATABASE:
              return <div>child database</div>
            case BLOCK_TYPES.EMBED:
              return <div>embed</div>
            case BLOCK_TYPES.FILE:
              return <div>file</div>
            case BLOCK_TYPES.PDF:
              return <div>pdf</div>
            case BLOCK_TYPES.BOOKMARK:
              return <div>bookmark</div>
            case BLOCK_TYPES.TABLE_OF_CONTENTS:
              return <div>table of contents</div>
            case BLOCK_TYPES.BREADCRUMB:
              return <div>breadcrumb</div>
            case BLOCK_TYPES.EQUATION:
              return <div>equation</div>
            case BLOCK_TYPES.COLUMN_LIST:
              return <div>column list</div>
            case BLOCK_TYPES.COLUMN:
              return <div>column</div>
          }
          return null
        })()
      }
    </>
  )

}
