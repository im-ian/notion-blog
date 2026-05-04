import Link from "next/link";

import { Routes } from "@/constants";
import type { AdjacentPosts } from "@/utils/notion";
import { Box, Flex } from "../Layouts";
import { Text } from "../Texts";
import {
  PrevNextContainerStyle,
  PrevNextItemStyle,
  PrevNextLabelStyle,
  PrevNextTitleStyle,
} from "./PrevNext.css";

interface PrevNextProps {
  adjacent: AdjacentPosts;
}

export function PrevNext({ adjacent }: PrevNextProps) {
  const { prev, next } = adjacent;
  if (!prev && !next) return null;

  return (
    <Box className={PrevNextContainerStyle}>
      <Flex
        flexDirection={{ mobile: "column", tablet: "row" }}
        gap={"medium"}
        alignItems={"flex-start"}
      >
        {prev ? (
          <Link
            href={Routes.Post(prev.slug)}
            className={PrevNextItemStyle}
            style={{ textAlign: "left" }}
          >
            <Text size={"0.5x"}>
              <span className={PrevNextLabelStyle}>{"← Newer"}</span>
            </Text>
            <span className={PrevNextTitleStyle}>{prev.title}</span>
          </Link>
        ) : (
          <span className={PrevNextItemStyle} aria-hidden={"true"} />
        )}

        {next ? (
          <Link
            href={Routes.Post(next.slug)}
            className={PrevNextItemStyle}
            style={{ textAlign: "right" }}
          >
            <Text size={"0.5x"}>
              <span className={PrevNextLabelStyle}>{"Older →"}</span>
            </Text>
            <span className={PrevNextTitleStyle}>{next.title}</span>
          </Link>
        ) : (
          <span className={PrevNextItemStyle} aria-hidden={"true"} />
        )}
      </Flex>
    </Box>
  );
}
