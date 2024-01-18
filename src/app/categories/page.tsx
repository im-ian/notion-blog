import { Metadata } from "next";
import Link from "next/link";

import { Box, Layout } from "@/components/Layouts";
import { Heading } from "@/components/Texts";
import { Routes } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { getCategories } from "@/services/notion";
import { classNames } from "@/utils/string";

export async function generateMetadata() {
  return {
    title: "카테고리",
  } as Metadata;
}

async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Layout
      className={sprinkles({
        paddingTop: "large",
        paddingX: "large",
      })}
    >
      {categories.map(({ name, postCount }, index) => {
        return (
          <Link key={index} href={Routes.Category(name)}>
            <Box
              className={classNames([
                sprinkles({
                  padding: "large",

                  borderWidth: "none",
                  borderStyle: "solid",
                  borderBottomWidth: "thin",
                  borderColor: "gray-200",
                }),
              ])}
            >
              <Heading size={"2x"}>{`${name} (${postCount})`}</Heading>
            </Box>
          </Link>
        );
      })}
    </Layout>
  );
}

export default CategoriesPage;
