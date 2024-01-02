import { TagClassName } from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { vars } from "@/css/vars.css";
import { classNames } from "@/utils/string";

export function Tags({ tags }: { tags: string }) {
  const tagList = tags.split(",");

  return (
    <div
      className={sprinkles({
        paddingY: "medium",
      })}
    >
      {tagList?.map((tag) => <Tag key={tag} label={tag} />)}
    </div>
  );
}

interface TagProps {
  label: string;
  bgColor?: keyof typeof vars.color;
}

export function Tag({ label, bgColor }: TagProps) {
  return (
    <span
      className={classNames([
        TagClassName,
        sprinkles({
          background: bgColor,
        }),
      ])}
    >
      {label}
    </span>
  );
}
