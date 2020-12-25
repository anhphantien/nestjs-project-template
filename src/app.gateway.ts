import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notifications')
  handleNotification(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    socket.join('');
    return data;
  }

  sendPushNotification() {
    return;
  }
}
