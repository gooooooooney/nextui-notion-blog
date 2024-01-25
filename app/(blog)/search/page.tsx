import { BlogList } from '@/components/blog-list'
import { NotionService } from '@/services/notion.service'
import React from 'react'

type SearchPageProps = {
  searchParams: {
    query: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { query } = searchParams || {}
  const data = await NotionService.getPagesByTitle(typeof query === 'string' ? query : undefined);
  return (
    <div className="flex  flex-col  px-4 md:mx-auto md:max-w-[80%]  md:px-40  ">
    {
      data?.length ? <BlogList desc={`Search results for ${query}`} titleName={query} blogs={data!}/> : <div className="text-center">No results found</div>
    }
  </div>
  )
}

export default SearchPage