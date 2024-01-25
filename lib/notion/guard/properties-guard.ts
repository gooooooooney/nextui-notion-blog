import { isTextRichTextItemResponse } from "@notionhq/client/build/src/helpers";
import {
  Properties,
  isFilesProperty,
  isMultiSelectProperty,
  isRichTextProperty,
  isSelectProperty,
  isTitleProperty,
} from "./is";

export const getTitle = (title: Properties) => {
  if (isTitleProperty(title)) {
    return title.title[0].plain_text;
  }
};

export const getTags = (tags: Properties) => {
  if (isMultiSelectProperty(tags)) {
    return tags.multi_select;
  }
  return [];
};

export const getPlainText = (text: Properties) => {
  if (isRichTextProperty(text)) {
    return text.rich_text?.[0] ? text.rich_text[0].plain_text : "";
  }
  return "";
};

export const getSelect = (select: Properties) => {
  if (isSelectProperty(select)) {
    return select.select;
  }
  return null;
};

export const getFiles = (files: Properties) => {
  if (isFilesProperty(files)) {
    return files.files.map((file) => {
      if (file.type === "external") {
        return file.external.url;
      } else if (file.type === "file") {
        return file.file.url;
      }
      return ""
    });
  }
  return [];
};
