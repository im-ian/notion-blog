"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  GitHub,
  // Menu,
  Search,
} from "react-feather";

import CommandPalette, { CommandPaletteHandle } from "../../Command";
import { Box, Flex, FlexItem, Layout } from "../../Layouts";
import { Heading } from "../../Texts";

import { HeaderContainerClassName, HeaderIconClassName } from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { getSiteConfig } from "@/utils/config";

const { title } = getSiteConfig("site");
const { github } = getSiteConfig("profile");

export function Header() {
  const commandRef = useRef<CommandPaletteHandle>(null);

  return (
    <>
      <div className={HeaderContainerClassName}>
        <Layout>
          <Flex>
            <FlexItem flex={"1"}>
              <Heading
                size={{
                  mobile: "1x",
                  tablet: "2x",
                }}
              >
                <a href={"/"}>{title}</a>
              </Heading>
            </FlexItem>
            <FlexItem flex={"none"}>
              <Box
                className={sprinkles({
                  textAlign: "right",
                })}
              >
                {github && (
                  <Box className={HeaderIconClassName}>
                    <Link
                      href={`https://github.com/${github}`}
                      target={"_blank"}
                    >
                      <GitHub size={24} />
                    </Link>
                  </Box>
                )}
                <Box
                  className={HeaderIconClassName}
                  onClick={() => {
                    commandRef.current?.open();
                  }}
                >
                  <Search size={24} />
                </Box>
                {/* <Box className={HeaderIconClassName}>
                  <Menu size={24} />
                </Box> */}
              </Box>
            </FlexItem>
          </Flex>
        </Layout>
      </div>

      <CommandPalette ref={commandRef} />
    </>
  );
}
