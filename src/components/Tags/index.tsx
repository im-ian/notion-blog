import { sprinkles } from "@/css/sprinkles.css";
import { HTMLAttributes } from "react";
import { TagClassName } from "./index.css";
import { classNames } from "@/utils/string";

export function Tags({ tags }: { tags: string }) {
  const tagList = tags.split(",");

  return (
    <div
      className={sprinkles({
        paddingY: "medium",
      })}
    >
      {tagList?.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
}

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={classNames([TagClassName, className])} {...props} />;
}
