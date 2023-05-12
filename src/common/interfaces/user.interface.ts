import { IFile } from "./file.interface";

export interface IUser extends Document {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    gender: GenderEnum;
    birthday: Date;
    email: string;
    password: string;
    role: RoleEnum;
    subscriptionID?: string;
    avatar: IFile;
    confirmed: boolean;
    confirmationToken: string;
    available: boolean;
}

export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export enum RoleEnum {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT'
}