import { getPosts } from "@/services/notion";
import { PostTag } from "@/types/notion";
import { getOptionColor } from "@/utils/color";
import { getPostAttribute } from "@/utils/notion";

export async function GET() {
  const { schema, blocks } = await getPosts();

  if (!blocks) return new Response(null, { status: 404 });

  const tagSet = new Set<string>();
  const result: PostTag[] = [];

  blocks.forEach((page) => {
    const properties = getPostAttribute(page.value, schema);

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
