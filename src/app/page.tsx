"use client";
import { Card, Flex, Layout } from "@/components/Layouts";
import { Tags } from "@/components/Tags";
import { Date as DateText, Heading } from "@/components/Texts";
import { Routes } from "@/constants";
import { useNotionContext } from "@/contexts/NotionContext";
import { sprinkles } from "@/css/sprinkles.css";

function Home() {
  const { data } = useNotionContext();
  const { pages } = data || {};

  return (
    <Layout
      className={sprinkles({
        padding: "medium",
      })}
    >
      {(pages || []).map(({ value }) => {
        const { attributes } = value;

        return (
          <a
            key={attributes.slug.value}
            href={Routes.Post(attributes.slug.value || "")}
          >
            <Card>
              <Heading size={"2x"} tint>
                {attributes.title.value}
              </Heading>
              <p>{attributes.summary.value}</p>
              <Flex>
                {attributes.category.value && (
                  <Tags
                    options={attributes.category.options}
                    tags={attributes.category.value}
                  />
                )}
                {attributes.tags.value && (
                  <Tags
                    options={attributes.tags.options}
                    tags={attributes.tags.value}
                  />
                )}
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
