import {
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

export type Posts = {
  schema: CollectionPropertySchemaMap;
  blocks: {
    role: Role;
    value: Block & {
      attributes: PostAttribute;
    };
  }[];
};

export type Post = {
  schema: CollectionPropertySchemaMap;
  block: {
    role: Role;
    value: Block & {
      attributes: PostAttribute;
    };
  };
};

export type PostTag = {
  name: string;
  postCount: number;
  color?: string;
};
