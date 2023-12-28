import { Card, Layout } from "@/components/Layouts";
import { Tags } from "@/components/Tags";
import { Date as DateText, Heading } from "@/components/Texts";
import { sprinkles } from "@/css/sprinkles.css";
import { getPageContent } from "@/services/notion";
import { getPageProperties, getPages, getSchema } from "@/utils/notion";

async function getArticleList() {
  const pageData = await getPageContent();
  if (!pageData) return [];

  const scheme = getSchema(pageData.collection);
  const pages = getPages(pageData.block);

  return pages
    .map((page) => getPageProperties(page.value.properties, scheme))
    .sort(
      (a, b) => +new Date(b?.date.value || 0) - +new Date(a?.date.value || 0)
    );
}

async function Home() {
  const articles = await getArticleList();

  return (
    <Layout
      className={sprinkles({
        padding: "medium",
      })}
    >
      {articles.map((article) => {
        return (
          <a key={article.slug.value} href={`/${article.slug.value}`}>
            <Card>
              <Heading size={"2x"} tint>
                {article.title.value}
              </Heading>
              <p>{article.summary.value}</p>
              <Tags tags={article.tags.value} />
              <DateText>{article.date.value}</DateText>
            </Card>
          </a>
        );
      })}
    </Layout>
  );
}

export default Home;
