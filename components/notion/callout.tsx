import { ICON_TYPE } from "@/lib/notion/types";
import { cn } from "@/lib/utils";
import { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./rich_text";
import { getColor } from "./color";

interface CalloutProps {
  block: CalloutBlockObjectResponse;
}

const Callout: React.FC<CalloutProps> = ({ block }: CalloutProps) => {
  const color = block.callout.color;
  const icon =
    block.callout.icon?.type === ICON_TYPE.EMOJI
      ? block.callout.icon.emoji
      : block.callout.icon?.type === ICON_TYPE.FILE
      ? block.callout.icon.file.url
      : null;
  return (
    <div className="w-full my-1">
      <div className="text-[1em] py-[3px] px-[2px] ">
        <div
          className={cn(
            getColor(color),
            "p-4 rounded-lg"
          )}
        >
          <div className="flex items-baseline w-full">
            <div className="pr-2 text-lg flex w-8 h-8 justify-center items-center">
              {icon}
            </div>
            <div>
              <RichText richTexts={block.callout.rich_text}></RichText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
