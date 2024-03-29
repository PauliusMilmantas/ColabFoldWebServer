import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BearerGuard } from './bearer.guard';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { RabbitMqService } from './rabbitmq.service';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'})
  ],
  controllers: [AppController],
  providers: [AppConfig, BearerGuard, RabbitMqService, TicketService],
})
export class AppModule {}
