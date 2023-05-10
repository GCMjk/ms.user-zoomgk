import { GenderEnum, RoleEnum } from "@common/interfaces/user.interface";

export class UserDTO {
    readonly firstname: string;
    readonly lastname: string;
    readonly username: string;
    readonly gender: GenderEnum;
    readonly birthday: Date;
    readonly email: string;
    readonly password: string;
    readonly role: RoleEnum;
}