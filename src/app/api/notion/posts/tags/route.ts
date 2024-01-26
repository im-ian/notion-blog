import { getPosts } from "@/services/notion";
import { PageTag } from "@/types/notion";
import { getOptionColor } from "@/utils/color";
import { getPageAttribute } from "@/utils/notion";

export async function GET() {
  const { schema, pages } = await getPosts();

  if (!pages) return new Response(null, { status: 404 });

  const tagSet = new Set<string>();
  const result: PageTag[] = [];

  pages.forEach((page) => {
    const properties = getPageAttribute(page.value.properties, schema);

    const tags = properties.tags?.value?.split(",") || [];

    tags.forEach((tag) => {
      const color = getOptionColor({
        value: tag,
        options: properties.tags.options,
      });

      if (tags.length) {
        if (tagSet.has(tag)) {
          const targetTag = result.find((c) => c.name === tag);
          if (targetTag) {
            targetTag.postCount += 1;
          }
        } else {
          result.push({
            name: tag,
            postCount: 1,
            color,
          });
          tagSet.add(tag);
        }
      }
    });
  });

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
