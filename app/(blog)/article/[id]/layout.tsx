import React from 'react';
import { NotionService } from '@/services/notion.service';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { ArticleLayout } from './_components/article-layout';
import { redis } from '@/lib/redis';
import { kvKeys } from '@/config/kv';

const Layout = async ({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    id: string;
  }
}) => {
  const { id } = params;
  const page = await NotionService.getPage(id) as PageObjectResponse;
  let views: number
  if (process.env.VERCEL_ENV === 'production') {
    views = await redis.incr(kvKeys.postViews(id))
  } else {
    views = 30578
  }
  return (
    <>
      <ArticleLayout
        page={page}
        views={views}
      >
        {children}
      </ArticleLayout>
    </>
  )
}

export default Layout