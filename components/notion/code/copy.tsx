"use client"
import { CopyIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import React from 'react'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'


type CodeProps = {
  code: string
}

export const Copy = ({ code }: CodeProps) => {
  const [, copy] = useCopyToClipboard()

  const onClickCopyToClipboard = React.useCallback(() => {
    copy(code).then(() => {
      toast.success('Copied to clipboard')
    })
  }, [code, copy])
  
  return (
    <Button onClick={onClickCopyToClipboard} isIconOnly size='sm'>
      <CopyIcon />
    </Button>
  )
}
