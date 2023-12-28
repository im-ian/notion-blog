import { Card, Layout } from "@/components/Layouts";
import { Date, Heading, Tag } from "@/components/Texts";
import { sprinkles } from "@/css/sprinkles.css";
import { getPageContent } from "@/services/notion";
import { getPageProperties, getPages, getSchema } from "@/utils/notion";

async function getArticleList() {
  const pageData = await getPageContent();
  if (!pageData) return [];

  const scheme = getSchema(pageData.collection);
  const pages = getPages(pageData.block);

  return pages.map((page) => getPageProperties(page.value.properties, scheme));
}

async function Home() {
  const articles = await getArticleList();

  return (
    <Layout>
      {articles.map((article) => {
        const tags = article.tags.value?.split(",");

        return (
          <a key={article.slug.value} href={`/${article.slug.value}`}>
            <Card>
              <Heading size={"2x"} tint>
                {article.title.value}
              </Heading>
              <p>{article.summary.value}</p>
              <div
                className={sprinkles({
                  paddingY: "small",
                })}
              >
                {tags?.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <Date>{article.date.value}</Date>
            </Card>
          </a>
        );
      })}
    </Layout>
  );
}

export default Home;
