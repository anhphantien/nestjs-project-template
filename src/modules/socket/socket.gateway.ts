import { ERROR_CODE } from '@/constants';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import jwt = require('jsonwebtoken');
import { Server, Socket } from 'socket.io';

require('dotenv').config();

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('addUser')
  async handleAddUser(@ConnectedSocket() socket: Socket, @MessageBody() token: string) {
    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET_KEY, { ignoreExpiration: true });
      if (!payload || !payload.id) {
        throw new BadRequestException(ERROR_CODE.INVALID_PAYLOAD);
      }
      if (payload.exp * 1000 < Date.now()) {
        throw new UnauthorizedException(ERROR_CODE.EXPIRED_TOKEN);
      }
      socket.join(`${payload.id}`);
      return 'User has joined the room!';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @SubscribeMessage('newNotifications')
  handleNewNotifications(room: string, data: any) {
    this.server.to(room).emit('newNotifications', data);
  }
}
