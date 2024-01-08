import { Metadata } from "next";
import Link from "next/link";

import { Box, Layout } from "@/components/Layouts";
import { Heading } from "@/components/Texts";
import { Routes } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { getPageContent } from "@/services/notion";
import { PageAttribute } from "@/types/notion";
import { getSchema, getPageAttribute, getPageList } from "@/utils/notion";
import { classNames } from "@/utils/string";

async function getCategories() {
  const pageData = await getPageContent();

  if (!pageData) {
    return [];
  }

  const scheme = getSchema(pageData.collection);
  const pages = getPageList(pageData.block);

  type Category = PageAttribute[string] & { count: number };

  const categorySet = new Set<string>();
  const categories: Category[] = [];

  pages.forEach((page) => {
    const properties = getPageAttribute(page.value.properties, scheme);

    const category = properties.category.value || "";

    if (category) {
      if (categorySet.has(category)) {
        const targetCategory = categories.find((c) => c.value === category);
        if (targetCategory) {
          targetCategory.count += 1;
        }
      } else {
        categories.push({
          ...properties.category,
          count: 1,
        });
        categorySet.add(category);
      }
    }
  });

  return Array.from(categories);
}

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
      {categories.map((category) => {
        const categoryValue = category.value as string;
        const categoryCount = category.count;

        return (
          <Link key={categoryValue} href={Routes.Category(categoryValue)}>
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
              <Heading
                size={"3x"}
              >{`${categoryValue} (${categoryCount})`}</Heading>
            </Box>
          </Link>
        );
      })}
    </Layout>
  );
}

export default CategoriesPage;
