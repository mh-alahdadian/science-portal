export interface singleNewsItem {
  image: string;
  title: string;
}

export interface newsSingleComment {
  userName: string;
  userImg: string;
  date: string;
  time: string;
  content: string;
  likes?: number;
  dislikes?: number;
}
export interface newsCommentType {
  items: newsSingleComment[];
}

export interface newsSingleCard extends SchemaOf<'news', 'PostDTO'> {
  author?: string
} 

export interface newsSingleItem {
    id: number;
    userId: number;
    categoryId: number;
    content: string;
    coverImage: string;
    createAt: string;
    feedbackStats?: any;
    idPublic: boolean;
    publishAt?: any;
    statusId?: number | null;
    title: string;
    updateAt?: any;
}
