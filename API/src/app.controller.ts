import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BearerGuard } from './bearer.guard';
import { RabbitMqService } from './rabbitmq.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
@UseGuards(BearerGuard)
export class AppController {
  constructor(private rabbitMqService: RabbitMqService) { }

  @Post('submit')
  submit(@Query('sequences') sequencesData: string, @Query('mode') _: string): Promise<string> {
    return this.rabbitMqService.sendMessage(sequencesData);
  }

  @Get('ticket')
  ticket() {
    
  }
}
