export interface IUser extends Document {
    _id: string;
    name: string;
    lastname: string;
    username: string;
    gender: string;
    birthday: string;
    email: string;
    password: string;
    avatar: string;
    confirmed: boolean;
    blocked: boolean;
    role: string;
}