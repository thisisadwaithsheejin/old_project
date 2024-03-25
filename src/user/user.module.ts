import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogModule } from './user.log/user.log.module';
import { UserLogService } from './user.log/user.log.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}]), UserLogModule],
  controllers: [UserController],
  providers: [UserService,UserLogService]
})


export class UserModule {}
