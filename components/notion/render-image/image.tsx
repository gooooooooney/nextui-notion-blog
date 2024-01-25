"use client";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getMediaUrl } from "@/lib/notion/guard/block-guard";
import { Skeleton } from "@nextui-org/skeleton";
import { Image } from "@nextui-org/image";
import { useLightBox } from "@/lib/store/use-light-box";

const breakpoints = [4320, 2160, 1080, 640, 384, 256, 128];

type RenderImageProps = {
  block: ImageBlockObjectResponse;
};

export const RenderImageSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="rounded-md">
        <div className="h-[400px] rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
};
export const RenderImage = ({ block }: RenderImageProps) => {
  const src = getMediaUrl(block.image);
  const setBlockId = useLightBox(state => state.setBlockId);

  return <>
    <div className="w-full overflow-hidden">
      <Image
        className="relative object-cover rounded-md cursor-pointer h-auto w-full"
        src={src}
        classNames={{
          wrapper: " !max-w-none w-full overflow-hidden",
        }}
        alt={block.image.caption?.[0]?.plain_text || "image"}
        onClick={() => setBlockId(block.id)}

      />
    </div>

  </>
};
