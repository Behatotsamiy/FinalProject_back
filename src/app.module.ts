import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StationsModule } from './stations/stations.module';
import { StationsGateway } from './stations/stations.gateway';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(`mongodb://localhost:27017/nothing`),
    StationsModule,
    AuthModule,
    ServicesModule
  ],
  controllers: [AppController],
  providers: [AppService, StationsGateway],
})
export class AppModule {}
