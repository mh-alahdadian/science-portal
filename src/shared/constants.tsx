export enum ModelType {
  BOOK = 2,
  NEWS = 4,
  COMMENT = 7,
  BlogPost = 8,
}

export enum ReactionType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

export const defaultPagination = { pageIndex: 0, pageSize: 10 };
