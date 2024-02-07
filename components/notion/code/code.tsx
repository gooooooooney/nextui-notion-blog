
import { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import React, { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { Copy } from './copy';
import { codeToHtml, } from 'shiki'
import "./code.css"

type CodeProps = {
  block: CodeBlockObjectResponse
}

export const Code = async ({ block }: CodeProps) => {
  const language = block.code.language.toLowerCase()
  const code = block.code.rich_text[0].plain_text
  const html = await codeToHtml(code, {
    lang: language ==="typescript" ? "tsx" : language.replace(/\s+/g, ''),
    themes: { 
      light: 'solarized-light',
      dark: 'solarized-dark',
    }
  })

  return (
    <div className='relative my-4 group'>
      <div className='absolute top-2 right-2 transition-opacity group-hover:opacity-100 lg:opacity-0'>
        <Copy code={code} />
      </div>
      {/* <pre className={cn("dark:!bg-[rgba(255,255,255)] !m-0 !p-0 dark:!bg-opacity-[0.1] !bg-[#f7f6f3] w-full min-w-0 text-left rounded-sm", `language-${language}`)} >
        <code className={`language-${language === 'typescript' ? 'tsx' : language} px-4 pb-8 pt-10 w-full block overflow-auto`}>
          {}
        </code>
      </pre> */}
      <div dangerouslySetInnerHTML={{__html: html}}>
        
      </div>
    </div>
  )
}
