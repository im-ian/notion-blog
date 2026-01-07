import type { Metadata } from "next";
import Link from "next/link";

import { Box, Layout } from "@/components/Layouts";
import { Text } from "@/components/Texts";
import { Routes } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { getTags } from "@/utils/notion";
import { cx } from "@/utils/string";

export async function generateMetadata() {
  return {
    title: "태그",
  } as Metadata;
}

async function TagsPage() {
  const tags = await getTags();

  return (
    <Layout
      sprinkle={{
        width: {
          desktop: "720px",
        },
        paddingX: {
          mobile: "medium",
          tablet: "none",
        },
      }}
    >
      {tags.map(({ name, postCount }) => {
        return (
          <Link key={name} href={Routes.Tag(name)}>
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
