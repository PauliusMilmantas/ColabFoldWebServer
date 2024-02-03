import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BearerGuard } from './bearer.guard';

@Controller()
export class AppController {
  @Get('databases')
  @UseGuards(BearerGuard)
  databases(): string[] {
    return [];
  }

  @Post('submit')
  @UseGuards(BearerGuard)
  submit() {

  }

  @Get('ticket')
  @UseGuards(BearerGuard)
  ticket() {
    
  }
}
