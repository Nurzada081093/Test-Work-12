export interface UserData {
    username: string;
    password: string;
    role: string;
    token: string;
    displayName: string;
    googleId: string;
    avatar: string | undefined;
}

export interface IImage {
    user: UserData;
    gallery_image: string | undefined;
    title: string;
}