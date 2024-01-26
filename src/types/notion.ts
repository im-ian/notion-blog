import {
  Block,
  BlockType,
  CollectionPropertySchemaMap,
  Role,
  SelectOption,
} from "notion-types";

export type PageAttribute = Record<
  string,
  {
    type: BlockType;
    id: string;
    value: string | undefined;
    options?: SelectOption[];
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

export type Page = {
  schema: CollectionPropertySchemaMap;
  page: {
    role: Role;
    value: Block & {
      attributes: PageAttribute;
    };
  };
};

export type PageTag = {
  name: string;
  postCount: number;
  color?: string;
};
