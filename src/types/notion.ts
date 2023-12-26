import { BlockType } from "notion-types";

export type PageProperties = Record<
  string,
  {
    type: BlockType;
    id: string;
    value: string | undefined;
  }
>;
