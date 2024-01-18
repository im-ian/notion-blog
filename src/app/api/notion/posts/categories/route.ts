import { getPosts } from "@/services/notion";
import { PageCategory } from "@/types/notion";
import { getOptionColor } from "@/utils/color";
import { getPageAttribute } from "@/utils/notion";

export async function GET() {
  const { schema, pages } = await getPosts();

  if (!pages) return new Response(null, { status: 404 });

  const categorySet = new Set<string>();
  const categories: PageCategory[] = [];

  pages.forEach((page) => {
    const properties = getPageAttribute(page.value.properties, schema);

    const category = properties.category.value || "";
    const color = getOptionColor({
      value: category,
      options: properties.category.options,
    });

    if (category) {
      if (categorySet.has(category)) {
        const targetCategory = categories.find((c) => c.name === category);
        if (targetCategory) {
          targetCategory.postCount += 1;
        }
      } else {
        categories.push({
          name: category,
          postCount: 1,
          color,
        });
        categorySet.add(category);
      }
    }
  });

  return new Response(JSON.stringify(categories), {
    status: 200,
  });
}
