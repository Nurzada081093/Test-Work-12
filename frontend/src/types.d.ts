export interface UserRegister {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | undefined;
  googleId: string | null;
}

export interface UserLoginResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
    messages: string;
    name: string;
    _message: string;
  };
}

export interface GlobalError {
  error: string;
}

export interface IImage {
  title: string;
  gallery_image: File | null;
}

export interface IImageMutation {
  _id: string;
  user: IUser;
  title: string;
  gallery_image: string;
}
