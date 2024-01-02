import { getSiteConfig } from "@/utils/config";
import { classNames } from "@/utils/string";

import { HeaderContainerClassName } from "./index.css";
import { Layout } from "../Layouts";
import { Heading } from "../Texts";

const { title } = getSiteConfig("site");

export function Header() {
  return (
    <div className={HeaderContainerClassName}>
      <Layout>
        <Heading size={"2x"}>
          <a href={"/"}>{title}</a>
        </Heading>
      </Layout>
    </div>
  );
}
