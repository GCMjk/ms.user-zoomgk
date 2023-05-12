import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { USER, SUBSCRIPTION } from '@common/models/models';
import { UserSchema } from './schema/user.schema';
import { SubscriptionSchema } from './schema/subscription.schema';
import { EmailModule } from '@/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory: () => UserSchema.plugin(require('mongoose-autopopulate'))
      },
      {
        name: SUBSCRIPTION.name,
        useFactory: () => SubscriptionSchema
      }
    ]),
    EmailModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
