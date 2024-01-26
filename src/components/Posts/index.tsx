import Link from "next/link";

import { Box, Card } from "../Layouts";
import { Tag } from "../Tags";
import { Heading, Text, Date as DateText } from "../Texts";

import { Routes } from "@/constants";
import { Page } from "@/types/notion";
import { getOptionColor } from "@/utils/color";

interface PostCardProps {
  page: Page["page"];
}

export function PostCard({ page }: PostCardProps) {
  const { attributes } = page.value;

  const { title, slug, summary, tags, date } = attributes;

  const tagList = tags.value?.split(",") || [];

  return (
    <article>
      <Card>
        <a key={slug.value} href={Routes.Post(slug.value || "")}>
          <Heading size={{ mobile: "2x", tablet: "3x" }}>{title.value}</Heading>
          <Box sprinkle={{ marginY: "medium" }}>
            <Text>{summary.value}</Text>
          </Box>
          <Box sprinkle={{ marginY: "medium" }}>
            {date.value && <DateText date={date.value} />}
          </Box>
        </a>
        <Box sprinkle={{ marginY: "medium" }}>
          {tagList.map((tag) => (
            <Link key={tag} href={Routes.Tag(tag)}>
              <Tag
                bgColor={getOptionColor({
                  options: tags.options,
                  value: tag,
                })}
                label={tag}
              />
            </Link>
          ))}
        </Box>
      </Card>
    </article>
  );
}
