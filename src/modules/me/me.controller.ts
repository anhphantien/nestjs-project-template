import { CurrentUser } from '@/common/decorators';
import { JwtGuard } from '@/common/guards';
import { IUser } from '@/common/interfaces';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChangePasswordBody } from './me.dto';
import { MeService } from './me.service';

@ApiTags('me')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api/me')
export class MeController {
  constructor(private readonly meService: MeService) { }

  @Get()
  async getMe(@CurrentUser() user: IUser) {
    return this.meService.getMe(user.id);
  }

  @Post('changePassword')
  async changePassword(@CurrentUser() user: IUser, @Body() body: ChangePasswordBody) {
    const { currentPassword, newPassword } = body;
    return this.meService.changePassword(user.id, currentPassword, newPassword);
  }
}
