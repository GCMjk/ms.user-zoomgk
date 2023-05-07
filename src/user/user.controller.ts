import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserMSG } from '@common/constants';
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
}
