import {
  Block,
  BlockType,
  CollectionPropertySchemaMap,
  Role,
} from "notion-types";

export type PageAttribute = Record<
  string,
  {
    type: BlockType;
    id: string;
    value: string | undefined;
  }
>;

export type Pages = {
  schema: CollectionPropertySchemaMap;
  pages: {
    role: Role;
    value: Block & {
      attributes: PageAttribute;
    };
  }[];
};
