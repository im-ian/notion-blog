import type {
  Block,
  BlockType,
  CollectionPropertySchemaMap,
  Role,
  SelectOption,
} from "notion-types";

export type PostAttribute = Record<
  string,
  {
    type: BlockType;
    id: string;
    value: string | undefined;
    options?: SelectOption[];
  }
>;

export type PostBlock = Block & {
  attributes: PostAttribute;
};

export type Posts = {
  schema: CollectionPropertySchemaMap;
  blocks: PostBlock[];
};

export type Post = {
  schema: CollectionPropertySchemaMap;
  block: PostBlock;
};

export type PostTag = {
  name: string;
  postCount: number;
  color?: string;
};
