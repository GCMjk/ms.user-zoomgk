import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { USER } from '@common/models/models';
import { IUser } from '@common/interfaces/user.interface';
import { IFile } from '@common/interfaces/file.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(USER.name) private readonly model: Model<IUser>
    ) {}

    async checkPassword(password: string, passwordDB: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordDB);
    }
    
    async findByUsername(username: string) {
        return await this.model.findOne({ username });
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async create (userDTO: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDTO.password);
        const confirmationToken = uuid.v4();
        const newUser = new this.model({ 
            ...userDTO,
            password: hash,
            confirmationToken
        });

        return await newUser.save();
    }

    async findAll (): Promise<IUser[]> {
        return await this.model.find().populate('subscriptionID');
    }

    async findOne (id: string): Promise<IUser> {
        return await this.model.findById(id).populate('subscriptionID');
    }

    async update (id: string, userDTO: UserDTO): Promise<IUser> {
        const hast = await this.hashPassword(userDTO.password);
        const user = {
            ...userDTO,
            password: hast
        }
        return await this.model.findByIdAndUpdate(
            id,
            user,
            { new: true }
        );
    }

    async confirmedUser (token: string) {
        const user = await this.model.findOne({ confirmationToken: token });

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }

        user.confirmed = true;
        user.confirmationToken = undefined;
        await user.save();

        return user;
    }

    async delete (id: string) {
        await this.model.findByIdAndDelete(id);

        return {
            status: HttpStatus.OK,
            message: 'User deleted successfully'
        }
    }

    async assignedSubscription (userId: string, subscriptionId: string): Promise<IUser> {
        return await this.model.findByIdAndUpdate(
            userId,
            { subscriptionID: subscriptionId },
            { new: true }
        ).populate('subscriptionID');
    }

    async uploadAvatar (id: string, avatar: IFile): Promise<IUser> {
        return await this.model.findByIdAndUpdate(
            id,
            { avatar },
            { new: true }
        );
    }
}