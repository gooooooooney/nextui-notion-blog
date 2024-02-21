import { title } from '@/components/primitives'
import React from 'react'
import { cn, prettifyNumber } from '@/lib/utils';
import { User } from '@nextui-org/user';
import { Tags } from '@/components/tags';
import { PageView, TagIcon } from '@/components/icons';
import { Divider } from '@nextui-org/divider';


type ShareButtonProps = {
  titleName?: string;
  time: string;
  userName: string;
  userAvatar: string;
  userDesc?: string;
  views: number;
  tags: {
    id: string;
    name: string;
  }[];
}

export const ArticleHeader = ({
  titleName,
  time,
  userName,
  userAvatar,
  userDesc,
  tags,
  views
}: ShareButtonProps) => {
  return (
    <section className="flex flex-col gap-y-6 w-full">
      <h1 className={cn("tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl", title({ size: "sm" }))}>
        {titleName}
      </h1>
      <div className='-order-1 flex items-center gap-x-2'>
          <TagIcon className='w-5 h-5' />
          <Tags hrefPrefix="/tag" tags={tags} />
        </div>
      <time
        dateTime={time}
        className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
      >
        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        <span className="ml-3">{time}</span>
      </time>
      <div className='flex items-center gap-x-2 text-[12px] md:text-sm'>
        <PageView className='w-5 h-5' />
        {prettifyNumber(views)}
      </div>


      <div className='flex flex-col gap-y-4 items-start sm:flex-row  sm:justify-between sm:items-center'>
        <Divider className='w-full' />
        {/* <User
          name={userName}
          avatarProps={{
            // color: "warning",
            name: userName,
            src: userAvatar
          }}
          description={userDesc}

        /> */}
        {/* <ShareButton title={titleName} /> */}
      </div>
    </section>
  )
}
