"use client"
import { useLightBox } from '@/lib/store/use-light-box'
import React from 'react'
import Lightbox, { type Slide } from 'yet-another-react-lightbox'

type ImageLightboxProps = {
  slides?: Slide[]
}

export const ImageLightbox = ({slides}: ImageLightboxProps) => {
  const {blockId, setBlockId} = useLightBox(state => state)
  if (!slides) return null
  return (
    <Lightbox
    open={blockId !== ""}
    close={() => setBlockId("")}
    slides={slides}
  />
  )
}
