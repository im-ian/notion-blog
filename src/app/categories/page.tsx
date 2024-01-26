import { Metadata } from "next";
import Link from "next/link";

import { Box, Layout } from "@/components/Layouts";
import { Text } from "@/components/Texts";
import { Routes } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { getCategories } from "@/services/notion";
import { cx } from "@/utils/string";

export async function generateMetadata() {
  return {
    title: "카테고리",
  } as Metadata;
}

async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Layout sprinkle={{ paddingTop: "large", paddingX: "large" }}>
      {categories.map(({ name, postCount }, index) => {
        return (
          <Link key={index} href={Routes.Category(name)}>
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

export default CategoriesPage;
