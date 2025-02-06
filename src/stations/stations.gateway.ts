import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

interface ActiveUser {
  deviceId: string;
  stationId: string;
  lastSeen: number;
}

@WebSocketGateway({ cors: true })
export class StationsGateway {
  @WebSocketServer()
  server: Server;

  private activeUsers: ActiveUser[] = [];

  @SubscribeMessage('userArrived')
  handleUserArrival(@MessageBody() data: { deviceId: string; stationId: string }) {
    const now = Date.now();
    const existingUser = this.activeUsers.find(user => user.deviceId === data.deviceId);

    if (existingUser) {
      existingUser.lastSeen = now;
      existingUser.stationId = data.stationId;
    } else {
      this.activeUsers.push({ ...data, lastSeen: now });
    }

    this.cleanInactiveUsers();
    this.server.emit('updateStationTraffic', this.countUsersPerStation());
  }

  @SubscribeMessage('userLeft')
  handleUserLeft(@MessageBody() data: { deviceId: string }) {
    this.activeUsers = this.activeUsers.filter(user => user.deviceId !== data.deviceId);
    this.server.emit('updateStationTraffic', this.countUsersPerStation());
  }

  private cleanInactiveUsers() {
    const now = Date.now();
    this.activeUsers = this.activeUsers.filter(user => now - user.lastSeen < 600000); // 10 минут
  }

  private countUsersPerStation() {
    const stationCounts = {};
    this.activeUsers.forEach(user => {
      if (!stationCounts[user.stationId]) {
        stationCounts[user.stationId] = 0;
      }
      stationCounts[user.stationId]++;
    });
    return stationCounts;
  }
}
