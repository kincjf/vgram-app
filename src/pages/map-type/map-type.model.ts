export class MapTypeModel {
  populars: Array<MapTypeItemModel>;
  categories: Array<MapTypeItemModel>;
  posts: Array<PostItemModel>;
  banner_title: string;
  banner_image: string;
}

export class MapTypeItemModel {
  title: string;
  image: string;
}

export class PostItemModel {
  images: Array<string>;
  address: string;
  likesCount: number;
  commentsCount: number;
  meLikes: boolean;
  date:string;
  comments: Array<CommentItemModel>;
}

export class CommentItemModel {
  name: string;
  comment: string;
}