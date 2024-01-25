import { getCoverUrl } from "@/lib/notion/guard/cover-guard";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { dateFormat } from "@/lib/date";
import { Text } from "@/components/text";
import {
  getFiles,
  getPlainText, getTags,
  getTitle
} from "@/lib/notion/guard/properties-guard";
import { cn } from "@/lib/utils";
import { title } from "@/components/primitives";
import { Divider } from "@nextui-org/divider";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Tags } from "@/components/tags";
import { UserInfo } from "@/lib/constants";
import { User } from "@nextui-org/user";

type BlogProps = {
  blog: PageObjectResponse;
};

export const BlogCard = ({ blog }: BlogProps) => {
  const properties = blog.properties;
  const author = getPlainText(properties.author) || UserInfo.name;
  return (
    <>
      <article
        key={blog.id}
        className="relative isolate flex flex-col gap-8 lg:flex-row"
      >
        <Image
          as={NextImage}
          // width={256}
          // height={256}
          fill
          //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={getCoverUrl(blog.cover)}
          alt=""
          classNames={{
            wrapper: "relative aspect-[16/9] overflow-hidden sm:aspect-[2/1] lg:aspect-square !max-w-none lg:w-64 lg:shrink-0",
          }}
          className="absolute inset-0 diagonal-object-position  transform hover:scale-125 h-full w-full rounded-2xl bg-gray-50   object-cover "
        />

        <div>
          <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={blog.created_time} className="text-gray-500">
              {dateFormat(blog.created_time)}
            </time>
            <Tags hrefPrefix="/tag" tags={getTags(properties.category)} />
          </div>
          <div className="group relative max-w-xl mt-2">
            <h3 className={cn(title({ size: "xs" }))}>
              <NextLink href={`/article/${blog.id}`}>
                <span className="absolute inset-0" />
                {getTitle(properties.title)}
              </NextLink>
            </h3>

            <Text title={getPlainText(properties.description)} className="mt-5 line-clamp-3">{getPlainText(properties.description)}</Text>
          </div>
          <Divider orientation="horizontal" className="mt-6" />
          <div className="mt-6 flex ">
            <User
              name={author}
              description={(
                <Link href={`mailto:${getPlainText(properties.author_desc) || UserInfo.desc}`} isExternal>
                  {getPlainText(properties.author_desc) || UserInfo.desc}
                </Link>
              )}
              avatarProps={{
                isBordered: true,
                src: getFiles(properties.author_avatar)?.[0] || UserInfo.avatar
              }}
            />

          </div>
        </div>
      </article>
    </>
  );
};
