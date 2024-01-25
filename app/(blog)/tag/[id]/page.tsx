import { Container } from "@/components/Container";
import { BlogList } from "@/components/blog-list";
import { getTags } from "@/lib/notion/guard/properties-guard";
import { NotionService } from "@/services/notion.service";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";

type TagPageProps = {
  params: {
    id: string;
  };
};

const TagPage = async ({ params: { id } }: TagPageProps) => {
  const database = await NotionService.getDatabase();
  let tagName = "";
  const blogs = (database?.results as PageObjectResponse[]).filter((blog) => {
    const categories = getTags(blog.properties?.category);
    return categories?.some((tag) => {
      if (tag.id === id) {
        if (!tagName) {
          tagName = tag.name;
        }
        return true;
      }
      return false;
    });
  });
  return (
    <Container>
      <BlogList titleName={tagName} blogs={blogs} />
    </Container>
  );
};

export default TagPage;
