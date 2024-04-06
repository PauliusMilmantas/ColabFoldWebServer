import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbitmq.controller';
import { SwipeService } from './services/swipe.service';
import { ResultsLoggerService } from './resultsLogger.service';
import { HttpModule } from '@nestjs/axios';
import { BlastConverter } from './converters/blast-converter.service';
import { DiamondService } from './services/diamond.service';
import { DownloadService } from './services/download.service';

@Module({
  controllers: [RabbitMqController],
  providers: [
    SwipeService,
    DiamondService,
    ResultsLoggerService,
    BlastConverter,
    DownloadService
  ],
  imports: [HttpModule]
})
export class AppModule {}
