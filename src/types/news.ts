export interface singleNewsItem {
    image: string;
    title: string

}
export interface newsListType {

    title: string;
    items?: singleNewsItem[];
}

export interface newsSingleComment {
    userName: string;
    userImg: string;
    date: string;
    time: string
    content: string;
    likes?: number;
    dislikes?: number;
}
export interface newsCommentType {
    items: newsSingleComment[];
}

export interface newsSingleCard {
    img: string;
    title: string;
    author: string;
    date: string;
    time: string;
}