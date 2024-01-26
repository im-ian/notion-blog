import { Box, Card, Flex } from "../Layouts";
import { Tag, Tags } from "../Tags";
import { Heading, Text, Date as DateText } from "../Texts";

import { Routes } from "@/constants";
import { Page } from "@/types/notion";
import { getOptionColor } from "@/utils/color";

interface PostCardProps {
  page: Page["page"];
}

export function PostCard({ page }: PostCardProps) {
  const { attributes } = page.value;

  return (
    <article>
      <Card>
        <a
          key={attributes.slug.value}
          href={Routes.Post(attributes.slug.value || "")}
        >
          <Heading size={"2x"}>{attributes.title.value}</Heading>
          <Box sprinkle={{ marginY: "medium" }}>
            <Text>{attributes.summary.value}</Text>
          </Box>
          <Box sprinkle={{ marginY: "medium" }}>
            {attributes.date.value && <DateText date={attributes.date.value} />}
          </Box>
        </a>
        <Box sprinkle={{ marginY: "medium" }}>
          <Flex>
            {attributes.category.value && (
              <Tag
                bgColor={getOptionColor({
                  options: attributes.category.options,
                  value: attributes.category.value,
                })}
                label={attributes.category.value || ""}
              />
            )}
            {attributes.tags.value && <Tags tags={attributes.tags.value} />}
          </Flex>
        </Box>
      </Card>
    </article>
  );
}
