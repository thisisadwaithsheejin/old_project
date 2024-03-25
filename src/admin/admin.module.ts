import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schemas/admin.schema';
import { AdminLogModule } from './admin.log/admin.log.module';
import { AdminLogService } from './admin.log/admin.log.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Admin',schema:AdminSchema}]), AdminLogModule],
  providers: [AdminService,AdminLogService],
  controllers: [AdminController]
})
export class AdminModule {}
