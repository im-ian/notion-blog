import { Menu, Search } from "react-feather";

import { Box, Flex, FlexItem, Layout } from "../Layouts";
import { Heading } from "../Texts";

import { HeaderContainerClassName, HeaderIconClassName } from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { getSiteConfig } from "@/utils/config";

const { title } = getSiteConfig("site");

export function Header() {
  return (
    <div className={HeaderContainerClassName}>
      <Layout>
        <Flex>
          <FlexItem flex={"1"}>
            <Heading size={"2x"}>
              <a href={"/"}>{title}</a>
            </Heading>
          </FlexItem>
          <FlexItem flex={"none"}>
            <Box
              className={sprinkles({
                textAlign: "right",
              })}
            >
              <Box className={HeaderIconClassName}>
                <Search />
              </Box>
              <Box className={HeaderIconClassName}>
                <Menu />
              </Box>
            </Box>
          </FlexItem>
        </Flex>
      </Layout>
    </div>
  );
}
