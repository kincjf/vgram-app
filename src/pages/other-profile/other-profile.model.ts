export class UserModel {
  image: string;
  location: string;
  about: string;
  email: string;
  phone: string;
  name: string;
  website: string;
  nickname: string;
  sex: string;
  facebook: string;
  instagram: string;
  blog: string;
  twitter: string;
}

export class ProfilePostModel {
  date: Date;
	image: string;
	description: string;
	likes: number = 0;
	comments: number = 0;
	liked: boolean = false;
}

export class ProfileModel {
  user: UserModel = new UserModel();
  following: Array<UserModel> = [];
  followers: Array<UserModel> = [];
  posts: Array<ProfilePostModel> = [];
}
