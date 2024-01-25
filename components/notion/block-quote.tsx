import { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./rich_text";

interface QuoteProps {
  block: QuoteBlockObjectResponse
}

const BlockQuote: React.FC<QuoteProps> = ({ block }: QuoteProps) => {

  return (
    <div className="w-full my-1">
      <div >
        <blockquote className="mt-6 ">
          <RichText richTexts={block.quote.rich_text}></RichText>
        </blockquote>
      </div>
    </div>
  );
};

export default BlockQuote;
