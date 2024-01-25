import { Container } from "@/components/Container";
import { BlogList } from "@/components/blog-list";
import { NotionService } from "@/services/notion.service";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default async function Home() {
	const database = await NotionService.getDatabase();

	return (
		<Container>
			<BlogList titleName="Blog" blogs={database?.results as PageObjectResponse[]} />
		</Container>
	);
}
