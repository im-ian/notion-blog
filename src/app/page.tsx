import { Card, Flex, Layout } from "@/components/Layouts";
import { Tags } from "@/components/Tags";
import { Date as DateText, Heading } from "@/components/Texts";
import { sprinkles } from "@/css/sprinkles.css";
import { getPages } from "@/services/notion";

async function getPageList() {
  const { pages } = (await getPages()) || {};
  if (!pages) return [];

  return pages.map((page) => page.value);
}

async function Home() {
  const pages = await getPageList();

  return (
    <Layout
      className={sprinkles({
        padding: "medium",
      })}
    >
      {pages.map((page) => {
        const { attributes } = page;

        return (
          <a key={attributes.slug.value} href={`/${attributes.slug.value}`}>
            <Card>
              <Heading size={"2x"} tint>
                {attributes.title.value}
              </Heading>
              <p>{attributes.summary.value}</p>
              <Flex>
                {attributes.category.value && (
                  <Tags tags={attributes.category.value} />
                )}
                {attributes.tags.value && <Tags tags={attributes.tags.value} />}
              </Flex>
              {attributes.date.value && (
                <DateText date={attributes.date.value} />
              )}
            </Card>
          </a>
        );
      })}
    </Layout>
  );
}

export default Home;
