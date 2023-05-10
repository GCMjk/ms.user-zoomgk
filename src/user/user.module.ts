import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { USER } from '@common/models/models';
import { UserSchema } from './schema/user.schema';
import { EmailModule } from '@/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory: () => UserSchema
      }
    ]),
    EmailModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
