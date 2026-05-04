"use client";

import { useRef } from "react";
import { Moon, Search, Sun } from "react-feather";

import { useTheme } from "@/hooks/useTheme";
import { getSiteConfig } from "@/utils/config";
import CommandPalette, { type CommandPaletteHandle } from "../../Command";
import { Box, Flex, FlexItem, Layout } from "../../Layouts";
import { Heading } from "../../Texts";
import { HeaderContainerClassName, HeaderIconClassName } from "./index.css";

const { title } = getSiteConfig("site");
const { showToggle: showThemeToggle } = getSiteConfig("theme");
const { showInHeader: showSearchInHeader } = getSiteConfig("search");

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme();
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
              {showThemeToggle && mounted && (
                <Box className={HeaderIconClassName} onClick={toggleTheme}>
                  {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
                </Box>
              )}
              {showSearchInHeader && (
                <Box
                  className={HeaderIconClassName}
                  onClick={() => {
                    commandRef.current?.open();
                  }}
                >
                  <Search size={24} />
                </Box>
              )}
            </FlexItem>
          </Flex>
        </Layout>
      </div>

      <CommandPalette ref={commandRef} />
    </>
  );
}
