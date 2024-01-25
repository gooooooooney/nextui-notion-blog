import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isCoverExternal, isCoverFile } from "./is";



export function getCoverUrl(cover: PageObjectResponse["cover"]) {
  
  if (isCoverExternal(cover)) {
    return cover?.external.url || "";
  }

  if (isCoverFile(cover)) {
    return cover.file.url;
  }
  return ""
}

