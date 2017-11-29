export class CommentModel {
  image: string;
  name: string;
  comment: string;
  date: Date;
  likesCount: number;
  likes: boolean;
  isMine: boolean;
}

export class CommentsModel {
  comments: Array<CommentModel>;
}