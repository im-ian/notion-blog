import { Card, Flex } from "../Layouts";
import { Tags } from "../Tags";
import { Heading, Text, Date as DateText } from "../Texts";

import { Routes } from "@/constants";
import { Page } from "@/types/notion";

interface PostCardProps {
  page: Page["page"];
}

export function PostCard({ page }: PostCardProps) {
  const { attributes } = page.value;

  return (
    <a
      key={attributes.slug.value}
      href={Routes.Post(attributes.slug.value || "")}
    >
      <Card>
        <Heading size={"2x"}>{attributes.title.value}</Heading>
        <Text>{attributes.summary.value}</Text>
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
        {attributes.date.value && <DateText date={attributes.date.value} />}
      </Card>
    </a>
  );
}
