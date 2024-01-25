"use client"

import { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import React from 'react';
import { highlightElement } from 'prismjs';
import 'prismjs/components/prism-clike.min.js';
import 'prismjs/components/prism-css-extras.min.js';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-js-extras.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-tsx.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-markdown.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-sql.min.js';
import 'prismjs/components/prism-rust.min.js';
import 'prismjs/components/prism-go.min.js';
import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/button';
import { CopyIcon } from '../icons';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';


type CodeProps = {
  block: CodeBlockObjectResponse
}

export const Code = ({ block }: CodeProps) => {
  const language = block.code.language.toLowerCase()
  const code = block.code.rich_text[0].plain_text
  const [, copy] = useCopyToClipboard()



  const codeRef = React.useRef(null)
  React.useEffect(() => {
    if (codeRef.current) {
      try {
        highlightElement(codeRef.current);
      } catch (err) {
        console.warn('prismjs highlight error', err)
      }
    }
  }, [codeRef])

  const onClickCopyToClipboard = React.useCallback(() => {
    copy(code).then(() => {
      toast.success('Copied to clipboard')
    })
  }, [code])


  return (
    <div className='relative my-4 group'>
      <div className='  absolute top-2 right-2 transition-opacity group-hover:opacity-100 lg:opacity-0'>
        <Button onClick={onClickCopyToClipboard} isIconOnly size='sm'>
          <CopyIcon />
        </Button>
      </div>
      <pre className={cn("dark:!bg-[rgba(255,255,255)] !m-0 !p-0 dark:!bg-opacity-[0.1] !bg-[#f7f6f3] w-full min-w-0 text-left rounded-sm", `language-${language}`)} >
        <code className={`language-${language === 'typescript' ? 'tsx' : language} px-4 pb-8 pt-10 w-full block overflow-auto`} ref={codeRef}>
          {code}
        </code>
      </pre>
    </div>
  )
}
