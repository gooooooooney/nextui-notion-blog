"use client"
import { realistic } from '@/lib/confetti'
import { cn } from '@/lib/utils'
import { Button } from '@nextui-org/button'
import React from 'react'
import { ThumbUp } from './icons'

export const Fire = ({className}: {className?: string}) => {
  return (
    <Button variant="flat" radius="full" size='md' color="secondary" isIconOnly className={cn("text-center group", className)}  onClick={() => {
        realistic()
    }}>
        <ThumbUp className='w-5 h-5 group-hover:animate-swing' />
    </Button>
  )
}
