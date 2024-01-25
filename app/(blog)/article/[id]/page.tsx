import { BlocksContainer } from '@/components/notion/blocks-container';
import { PAGE_TYPES } from '@/lib/notion/types';
import { NotionService } from '@/services/notion.service';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await NotionService.getPage(params.id)!;
  let keywords = ''
  let description = ''
  Object.entries(p?.properties || {}).forEach(([key, value]) => {
    switch (value.type) {
      case PAGE_TYPES.MULTI_SELECT:
        if (key === 'meta') {
          keywords = value.multi_select?.map(v => v.name).join(',')
        }
        break;
      case PAGE_TYPES.RICH_TEXT:
        if (key === 'description') {
          description = value.rich_text[0]?.plain_text
        }
        break;
      default:
        break;
    }
  });
  const getShortcutIcon = (icon: string) => {
    return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>`
  }
  return {
    title: p?.properties.title.type == PAGE_TYPES.TITLE ? p?.properties.title.title[0]?.plain_text : 'notion with nextjs',
    keywords,
    viewport: 'width=device-width, initial-scale=1.0, user-scalable=no,minimum-scale=1.0, maximum-scale=1.0',
    description,
    icons: {
      shortcut: getShortcutIcon(p?.icon?.type === PAGE_TYPES.EMOJI && p.icon.emoji || "🐠"),
    },
  }
}

type ArticlePageProps = {
  params: {
    id: string;
  };
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { id } = params;
  const blocks = await NotionService.getBlocks(id);
  return (
    <BlocksContainer initialBlocks={blocks} />
  )
}

export default ArticlePage