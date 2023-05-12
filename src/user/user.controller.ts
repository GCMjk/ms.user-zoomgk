import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserMSG } from '@common/constants';
import { IFile } from '@common/interfaces/file.interface';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller()
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) {}

    @MessagePattern(UserMSG.CREATE)
    create(@Payload() userDTO: UserDTO) {
        return this._userService.create(userDTO);
    }

    @MessagePattern(UserMSG.FIND_ALL)
    findAll() {
        return this._userService.findAll();
    }

    @MessagePattern(UserMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this._userService.findOne(id);
    }

    @MessagePattern(UserMSG.UPDATE)
    update(@Payload() payload: { id: string, userDTO: UserDTO }) {
        return this._userService.update(payload.id, payload.userDTO);
    }

    @MessagePattern(UserMSG.DELETE)
    delete(@Payload() id: string) {
        return this._userService.delete(id);
    }

    @MessagePattern(UserMSG.CONFIRMED)
    confirmedUser(@Payload() token: string) {
        return this._userService.confirmedUser(token);
    }

    @MessagePattern(UserMSG.VALID_USER)
    async validateUser(@Payload() payload: any) {
        const user = await this._userService.findByUsername(payload.username);

        const isValidPassword = await this._userService.checkPassword(
            payload.password,
            user.password
        );

        if (user && isValidPassword) return user;

        return null;
    }

    @MessagePattern(UserMSG.ASSIGNED_SUB)
    async assignedSubscription(@Payload() { userId, subscriptionId }: { userId: string, subscriptionId: string }) {
        return this._userService.assignedSubscription(userId, subscriptionId);
    }

    @MessagePattern(UserMSG.UPLOAD_AVATAR)
    async uploadAvatar(@Payload() { id, avatar }: { id: string, avatar: IFile }) {
        return this._userService.uploadAvatar(id, avatar);
    }

}
