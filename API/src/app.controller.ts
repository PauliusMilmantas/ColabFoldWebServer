import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BearerGuard } from './bearer.guard';
import { EngineType, RabbitMqService } from './rabbitmq.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TicketService } from './ticket.service';

@Controller()
@ApiBearerAuth()
@UseGuards(BearerGuard)
export class AppController {
  constructor(
    private rabbitMqService: RabbitMqService,
    private ticketService: TicketService
  ) { }

  @Post('submit')
  submit(@Query('sequences') sequencesData: string, @Query('engine') engine: EngineType): Promise<string> {
    return this.rabbitMqService.sendMessage(sequencesData, engine);
  }

  @Get('ticket')
  ticket(@Query('ticket') ticket: string) {
    this.ticketService.getTicketStatus(ticket);
  }
}
