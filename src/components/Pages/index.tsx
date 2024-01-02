import { getSiteConfig } from "@/utils/config";

import { HeaderContainerClassName } from "./index.css";
import { Box, Flex, FlexItem, Layout } from "../Layouts";
import { Heading } from "../Texts";
import { sprinkles } from "@/css/sprinkles.css";

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
