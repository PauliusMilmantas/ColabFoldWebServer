import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbitmq.controller';
import { MMseqs2Service } from './services/MMseqs2/MMseqs2.service';

@Module({
  controllers: [RabbitMqController],
  providers: [
    MMseqs2Service
  ]
})
export class AppModule {}
