import { Metadata } from "next";
import Link from "next/link";

import { Box, Layout } from "@/components/Layouts";
import { Text } from "@/components/Texts";
import { Routes } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { getTags } from "@/services/notion";
import { cx } from "@/utils/string";

export async function generateMetadata() {
  return {
    title: "태그",
  } as Metadata;
}

async function TagsPage() {
  const tags = await getTags();

  return (
    <Layout sprinkle={{ paddingTop: "large", paddingX: "large" }}>
      {tags.map(({ name, postCount }, index) => {
        return (
          <Link key={index} href={Routes.Tag(name)}>
            <Box
              className={cx([
                sprinkles({
                  padding: "large",

                  borderWidth: "none",
                  borderStyle: "solid",
                  borderBottomWidth: "thin",
                  borderColor: {
                    lightMode: "gray-100",
                    darkMode: "gray-600",
                  },
                }),
              ])}
            >
              <Text size={"2x"}>{`${name} (${postCount})`}</Text>
            </Box>
          </Link>
        );
      })}
    </Layout>
  );
}

export default TagsPage;
