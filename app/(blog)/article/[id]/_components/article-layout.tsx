import { Container } from "@/components/Container";
import { Prose } from "@/components/notion/prose/Prose";
import { dateFormat } from "@/lib/date";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import {
  getFiles,
  getPlainText,
  getSelect,
  getTags,
  getTitle,
} from "@/lib/notion/guard/properties-guard";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { getCoverUrl } from "@/lib/notion/guard/cover-guard";
import { ArticleHeader } from "./header";
import { Fire } from "@/components/fire";
import { UserInfo } from "@/lib/constants";

type ArticleProps = {
  page: PageObjectResponse;
  children: React.ReactNode;
};

export const ArticleLayout = ({ page, children }: ArticleProps) => {
  const properties = page.properties;
  const name = getTitle(properties.title);

  return (
    <div>
      <Image
        as={NextImage}
        // width={256}
        // height={256}
        fill
        //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={getCoverUrl(page.cover)}
        alt=""
        radius="none"
        classNames={{
          wrapper: "relative overflow-hidden !max-w-none w-full h-80 ",
        }}
        className="absolute inset-0 diagonal-object-position rounded-b-sm object-cover "
      />


      <Container className="mt-8 lg:mt-10">
        <article className="flex flex-col justify-center items-center">
          <ArticleHeader
            tags={getTags(properties.category)}
            titleName={name}
            time={dateFormat(page.created_time, "EEEE, MMM dd, yyyy")}
            userAvatar={getFiles(properties.author_avatar)?.[0] || UserInfo.avatar}
            userName={getPlainText(properties.author) || UserInfo.name}
            userDesc={getPlainText(properties.author_desc) || UserInfo.desc}
          />
          <Prose className="mt-8 w-full" data-mdx-content>
            {children}
          </Prose>

        </article>
        <div className="text-center py-16 sm:pt-32 sm:pb-auto">
          <Fire />
        </div>

      </Container>


    </div>
  );
};
