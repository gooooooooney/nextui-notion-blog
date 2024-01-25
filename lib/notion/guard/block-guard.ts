import { ImageBlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ExternalOfFile, isExternal, isFile, isParentPageType } from "./is";

export function getParentPage(parent: PageObjectResponse["parent"]) {
    if (isParentPageType(parent)) {
        return parent;
    }
    return null;
}

export function getMediaUrl(media: ExternalOfFile) {
    if (isExternal(media)) {
        return media.external.url;
    } else if (isFile(media)) {
        return media.file.url;
    }
    return ""
}