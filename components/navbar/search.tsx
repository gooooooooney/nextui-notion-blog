"use client"
import { Input } from '@nextui-org/input'
import React from 'react'
import { SearchIcon } from '../icons'
import {useRouter} from 'next/navigation'
import { useIsClient } from 'usehooks-ts'

export const Search = () => {
  const isClient = useIsClient()
  const router = useRouter()

  const goToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      if (e.currentTarget.value === '') return
      router.push(`/search?query=${e.currentTarget.value}`)
    }
  }

  if (!isClient) return null

  return (
    <Input
      onKeyDown={goToSearch}
      classNames={{
        base: "max-w-full sm:max-w-[10rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
    />
  )
}
