import { Global, Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Global()
@Module({
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
