import { BlockObjectResponse, ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import { Prose } from "./prose/Prose";
import { BlockRenderer } from "./block_renderer";
import { BLOCK_TYPES } from "@/lib/notion/types";
import { getMediaUrl, getParentPage } from "@/lib/notion/guard/block-guard";
import { cn } from "@/lib/utils";
import { isImageBlock } from "@/lib/notion/guard/is";
import { ImageLightbox } from "./image-lightbox";
import { type Slide } from "yet-another-react-lightbox";

type BlocksContainerProps = {
  initialBlocks?: BlockObjectResponse[];
};

function cycle(a: number) {
  return a % 3;
}

export const renderBlocks = (
  blocks?: BlockObjectResponse[],
  nestedLevel = 0
) => {
  if (!blocks) return null;
  const renderedElements: (React.JSX.Element | null)[] = [];
  let currentList: (React.JSX.Element | null)[] | null = null;

  const getBulletedList = (block: BlockObjectResponse, index: number) => {
    const listClasses: any = {
      0: "list-disc [&_>li]:marker:text-black dark:[&_>li]:marker:text-white",
      1: "list-[circle] [&_>li]:marker:text-black dark:[&_>li]:marker:text-white",
      2: "list-[square] [&_>li]:marker:text-black dark:[&_>li]:marker:text-white",
    };

    if (currentList) {
      currentList.push(
        <BlockRenderer nestedLevel={nestedLevel} key={block.id} block={block} />
      );
    } else {
      currentList = [
        <BlockRenderer
          nestedLevel={nestedLevel}
          key={block.id}
          block={block}
        />,
      ];
    }
    const nextBlock = blocks[index + 1];
    const nextParent = getParentPage(nextBlock?.parent);
    const parent = getParentPage(block.parent);

    if (
      !(
        nextBlock &&
        nextBlock.type === BLOCK_TYPES.BULLETED_LIST_ITEM &&
        nextParent?.page_id === parent?.page_id
      )
    ) {
      renderedElements.push(
        <ul className={cn(listClasses[cycle(nestedLevel)])}>{currentList}</ul>
      );
      currentList = null;
    }
  };
  const getNumberedList = (block: BlockObjectResponse, index: number) => {
    const listClasses: any = {
      0: "list-decimal",
      1: "list-[lower-alpha]",
      2: "list-[lower-roman]",
    };

    if (currentList) {
      currentList.push(
        <BlockRenderer nestedLevel={nestedLevel} key={block.id} block={block} />
      );
    } else {
      currentList = [
        <BlockRenderer
          nestedLevel={nestedLevel}
          key={block.id}
          block={block}
        />,
      ];
    }
    const nextBlock = blocks[index + 1];
    const nextParent = getParentPage(nextBlock?.parent);
    const parent = getParentPage(block.parent);
    if (
      !(
        nextBlock &&
        nextBlock.type === BLOCK_TYPES.NUMBERED_LIST_ITEM &&
        nextParent?.page_id === parent?.page_id
      )
    ) {
      renderedElements.push(
        <ol className={cn(listClasses[cycle(nestedLevel)])}>{currentList}</ol>
      );
      currentList = null;
    }
  };

  blocks.forEach((block, index) => {
    switch (block.type) {
      case BLOCK_TYPES.BULLETED_LIST_ITEM:
        getBulletedList(block, index);
        break;
      case BLOCK_TYPES.NUMBERED_LIST_ITEM:
        getNumberedList(block, index);
        break;
      default:
        renderedElements.push(<BlockRenderer key={block.id} block={block} />);
        break;
    }
  });

  return renderedElements;
};

export const BlocksContainer = ({ initialBlocks }: BlocksContainerProps) => {
  const imageBlocks = initialBlocks?.filter((block) => isImageBlock(block)) as ImageBlockObjectResponse[]
  const slides: Slide[] = imageBlocks?.map((block) => {
    const src = getMediaUrl(block.image)

    return {
      src,
      alt: block.image.caption?.[0]?.plain_text,
      srcSet: [
        {
          src,
          width: 1000,
          height: 500,
        }
      ]
    }
  });
  return (
    <>
      {renderBlocks(initialBlocks)}
      <ImageLightbox slides={slides} />
    </>
  );
};
