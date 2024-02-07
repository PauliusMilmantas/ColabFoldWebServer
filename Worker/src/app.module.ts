import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbitmq.controller';
import { SwipeService } from './services/swipe.service';

@Module({
  controllers: [RabbitMqController],
  providers: [
    SwipeService
  ]
})
export class AppModule {}
