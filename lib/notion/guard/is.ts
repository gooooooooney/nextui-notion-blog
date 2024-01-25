import { BlockObjectResponse, ImageBlockObjectResponse, PageObjectResponse, VideoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { IMAGE_TYPE } from "../types";

export type Properties = PageObjectResponse["properties"][string];

export type ExternalOfFile = VideoBlockObjectResponse["video"];


export function isImageBlock(block: BlockObjectResponse): block is ImageBlockObjectResponse {
  return block.type === "image";
}

export function isTitleProperty(title: Properties): title is Extract<Properties, { type: "title" }> {
  return title.type === "title";
}



export function isRichTextProperty(richText: Properties): richText is Extract<Properties, { type: "rich_text" }> {
  return richText?.type === "rich_text";
}

export function isNumberProperty(number: Properties): number is Extract<Properties, { type: "number" }> {
  return number.type === "number";
}

export function isSelectProperty(select: Properties): select is Extract<Properties, { type: "select" }> {
  return select?.type === "select";
}

export function isMultiSelectProperty(multiSelect: Properties): multiSelect is Extract<Properties, { type: "multi_select" }> {
  return multiSelect.type === "multi_select";
}

export function isDateProperty(date: Properties): date is Extract<Properties, { type: "date" }> {
  return date.type === "date";
}

export function isPeopleProperty(people: Properties): people is Extract<Properties, { type: "people" }> {
  return people.type === "people";
}

export function isFilesProperty(files: Properties): files is Extract<Properties, { type: "files" }> {
  return files?.type === "files";
}
export function isExternalProperty(files: Properties): files is Extract<Properties, { type: "files" }> {
  return files.type === "files";
}

export function isCheckboxProperty(checkbox: Properties): checkbox is Extract<Properties, { type: "checkbox" }> {
  return checkbox.type === "checkbox";
}

export function isUrlProperty(url: Properties): url is Extract<Properties, { type: "url" }> {
  return url.type === "url";
}

export function isEmailProperty(email: Properties): email is Extract<Properties, { type: "email" }> {
  return email.type === "email";
}

export function isPhoneNumberProperty(phoneNumber: Properties): phoneNumber is Extract<Properties, { type: "phone_number" }> {
  return phoneNumber.type === "phone_number";
}

export function isFormulaProperty(formula: Properties): formula is Extract<Properties, { type: "formula" }> {
  return formula.type === "formula";
}

export function isRelationProperty(relation: Properties): relation is Extract<Properties, { type: "relation" }> {
  return relation.type === "relation";
}

export function isRollupProperty(rollup: Properties): rollup is Extract<Properties, { type: "rollup" }> {
  return rollup.type === "rollup";
}

export function isCreatedTimeProperty(createdTime: Properties): createdTime is Extract<Properties, { type: "created_time" }> {
  return createdTime.type === "created_time";
}

export function isCreatedByProperty(createdBy: Properties): createdBy is Extract<Properties, { type: "created_by" }> {
  return createdBy.type === "created_by";
}

export function isLastEditedTimeProperty(lastEditedTime: Properties): lastEditedTime is Extract<Properties, { type: "last_edited_time" }> {
  return lastEditedTime.type === "last_edited_time";
}

export function isLastEditedByProperty(lastEditedBy: Properties): lastEditedBy is Extract<Properties, { type: "last_edited_by" }> {
  return lastEditedBy.type === "last_edited_by";
}

export function isCoverExternal(
  cover: PageObjectResponse["cover"]
): cover is Exclude<PageObjectResponse["cover"], { type: "file" }> {
  return cover !== null && cover.type === "external";
}

export function isCoverFile(
  cover: PageObjectResponse["cover"]
): cover is Exclude<PageObjectResponse["cover"], { type: "external" }> {
  return cover !== null && cover.type === "file";
}


export function isParentPageType(parent?: PageObjectResponse["parent"]): parent is Extract<PageObjectResponse["parent"], { type: "page_id" }> {
  return parent?.type === "page_id"
}


export function isExternal(external: ExternalOfFile): external is Extract<ExternalOfFile, { type: "external" }>{
  return external.type === IMAGE_TYPE.EXTERNAL;
}
export function isFile(file: ExternalOfFile): file is Extract<ExternalOfFile, { type: "file" }>{
  return file.type === IMAGE_TYPE.FILE;
}