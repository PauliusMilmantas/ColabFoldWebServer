import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbitmq.controller';

@Module({
  controllers: [RabbitMqController]
})
export class AppModule {}
