import { Chip } from "@nextui-org/chip";
import React from "react";
import NextLink from "next/link";
import { generateColor } from "@/lib/color";

type TagsProps = {
  tags: {
    id: string,
    name: string
  }[],
  hrefPrefix?: string
};

export const Tags = ({ tags, hrefPrefix }: TagsProps) => {
  return (
    <>
      {tags.map((tag) => (
        <Chip
          className="h-5"
          size="sm"
          as={NextLink}
          style={{
            backgroundColor: generateColor(tag.name).backgroundColor,
            color: generateColor(tag.name).color,
          }}
          key={tag.id}
          href={`${hrefPrefix || "/category" }/${tag.id}`}
        >
          {tag.name}
        </Chip>
      ))}
    </>
  );
};
