import { ExtendedRecordMap } from "notion-types";

export function getCollectionView({ block }: ExtendedRecordMap) {
  const blockIds = Object.keys(block);
  const blocks = blockIds.map((blockId) => block[blockId]);

  return blocks.filter((block) => {
    if (
      block.value.type === "collection_view" ||
      block.value.type === "collection_view_page"
    ) {
      return block;
    }
  });
}
