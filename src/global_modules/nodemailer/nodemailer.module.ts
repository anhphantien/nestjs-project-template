import { Global, Module } from '@nestjs/common';
import { NodeMailerService } from './nodemailer.service';

@Global()
@Module({
  providers: [NodeMailerService],
  exports: [NodeMailerService],
})
export class NodeMailerModule { }
