"use client"
import { useLightBox } from '@/lib/store/use-light-box'
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import React from 'react'
import Lightbox, { type Slide } from 'yet-another-react-lightbox'
import "yet-another-react-lightbox/styles.css";


type ImageLightboxProps = {
  slides?: Slide[]
}

export const ImageLightbox = ({ slides }: ImageLightboxProps) => {
  const { blockId, setBlockId } = useLightBox(state => state)
  if (!slides) return null
  return (
    <Lightbox
      plugins={[Zoom]}
      open={blockId !== ""}
      index={slides.findIndex(slide => slide.src === blockId)}
      close={() => setBlockId("")}
      slides={slides}
    />
  )
}
