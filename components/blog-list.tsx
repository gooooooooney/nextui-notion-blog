import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cn } from "@/lib/utils";
import { title } from "@/components/primitives";
import { BlogCard } from "./blog-card";

export type BlogProps = {
  blogs?: PageObjectResponse[];
  titleName?: string;
  desc?: string;
};

export const BlogList = ({ blogs, titleName = "Story", desc = "Personal blog" }: BlogProps) => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto  px-6 lg:px-8">
        <div className="mx-auto">
          <>
            <h2 className={cn(title({ size: "sm" }))}>{titleName}</h2>
            <p className="mt-2 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
              {desc}
            </p>
          </>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {blogs?.map((blog) => (
              <BlogCard blog={blog} key={blog.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

