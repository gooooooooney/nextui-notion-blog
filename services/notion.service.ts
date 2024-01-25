import { notion } from "@/lib/notion/notion-db";
import { BlockObjectResponse, DatabaseObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isNotionClientError, ClientErrorCode, APIErrorCode } from "@notionhq/client"

const errorHandler = (err: unknown) => {
  if (isNotionClientError(err)) {
    {
      switch (err.code) {
        case ClientErrorCode.RequestTimeout:
          console.error("Request timeout")
          break
        case APIErrorCode.ObjectNotFound:
          console.error("Object not found")
          break
        case APIErrorCode.Unauthorized:
          console.error("Unauthorized")
          break
        // ...
        default:
          // you could even take advantage of exhaustiveness checking
          console.error("Unknown error")
      }
    }
    return true
  }
  return false
}


export class NotionService {
  static async getDatabase() {
    try {
      const database = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID as string,
      });

      return database;
    } catch (error) {
      errorHandler(error)
    }
  }
  static async getPage(pageId: string) {
    try {
      const page = await notion.pages.retrieve({
        page_id: pageId,
      });
      return page as PageObjectResponse;
    } catch (error) {
      errorHandler(error)
    }
  }

  static async getBlocks(blockId: string, start_cursor?: string) {
    try {
      const blocks = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: start_cursor,
      });
      let results = blocks.results as BlockObjectResponse[];
      if (blocks.has_more) {
        const moreResults = await this.getBlocks(blockId, blocks.next_cursor!);
        results = [...results, ...moreResults!];
      }
      return results;
    } catch (error) {
      errorHandler(error)
    }
  }

  static async getPagesByTitle(query?: string) {
    try {
      const data = await notion.search({
        query,
        filter: {
          value: "page",
          property: "object",
        },
        sort: {
          direction: "ascending",
          timestamp: "last_edited_time",
        }
      })
      return data.results as PageObjectResponse[];
    } catch (error) {
      errorHandler(error)
    }
  }
}
