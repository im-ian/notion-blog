import { Box, Flex, FlexItem, Layout } from "../Layouts";
import { Heading } from "../Texts";

import { HeaderContainerClassName } from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { getSiteConfig } from "@/utils/config";

const { title } = getSiteConfig("site");

export function Header() {
  return (
    <div className={HeaderContainerClassName}>
      <Layout>
        <Flex>
          <FlexItem>
            <Heading size={"2x"}>
              <a href={"/"}>{title}</a>
            </Heading>
          </FlexItem>
          <FlexItem>
            <Box
              className={sprinkles({
                textAlign: "right",
              })}
            >
              asd
            </Box>
          </FlexItem>
        </Flex>
      </Layout>
    </div>
  );
}
