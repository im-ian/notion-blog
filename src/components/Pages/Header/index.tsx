"use client";

import { useRef } from "react";
import { Search } from "react-feather";
import { getSiteConfig } from "@/utils/config";
import CommandPalette, { type CommandPaletteHandle } from "../../Command";
import { Box, Flex, FlexItem, Layout } from "../../Layouts";
import { Heading } from "../../Texts";
import { HeaderContainerClassName, HeaderIconClassName } from "./index.css";

const { title } = getSiteConfig("site");

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
                className={HeaderIconClassName}
                onClick={() => {
                  commandRef.current?.open();
                }}
              >
                <Search size={24} />
              </Box>
            </FlexItem>
          </Flex>
        </Layout>
      </div>

      <CommandPalette ref={commandRef} />
    </>
  );
}
