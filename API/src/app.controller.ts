import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BearerGuard } from './bearer.guard';
import { RabbitMqService } from './rabbitmq.service';

@Controller()
export class AppController {
  
  constructor(private rabbitMqService: RabbitMqService) {}

  @Post('submit')
  @UseGuards(BearerGuard)
  submit(@Param('sequences') sequencesData: string, @Param('mode') _: string): Promise<string> {
    return this.rabbitMqService.sendMessage(sequencesData);
  }

  @Get('ticket')
  @UseGuards(BearerGuard)
  ticket() {
    
  }
}
