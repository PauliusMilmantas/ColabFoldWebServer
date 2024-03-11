import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbitmq.controller';
import { SwipeService } from './services/swipe.service';
import { ResultsLoggerService } from './resultsLogger.service';
import { HttpModule } from '@nestjs/axios';
import { SwipeConverter } from './converters/swipe-converter.service';
import { DiamondService } from './services/diamond.service';

@Module({
  controllers: [RabbitMqController],
  providers: [
    SwipeService,
    DiamondService,
    ResultsLoggerService,
    SwipeConverter
  ],
  imports: [HttpModule]
})
export class AppModule {}
