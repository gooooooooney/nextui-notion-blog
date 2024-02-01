import React from 'react';
import "prismjs/themes/prism-solarizedlight.min.css";
import { NotionService } from '@/services/notion.service';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { ArticleLayout } from './_components/article-layout';

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

  return (
    <>
      <ArticleLayout
        page={page}
      >
        {children}
      </ArticleLayout>
    </>
  )
}

export default Layout