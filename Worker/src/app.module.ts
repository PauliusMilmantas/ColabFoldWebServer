import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbitmq.controller';
import { SwipeService } from './services/swipe.service';
import { ResultsLoggerService } from './resultsLogger.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [RabbitMqController],
  providers: [
    SwipeService,
    ResultsLoggerService
  ],
  imports: [HttpModule]
})
export class AppModule {}
