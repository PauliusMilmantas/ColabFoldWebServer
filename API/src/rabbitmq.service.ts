import { Injectable } from "@nestjs/common";
import * as amqp from 'amqplib';
import { AppConfig } from "./config/app.config";
import { TicketService } from "./ticket.service";

export type EngineType = 'MMseq2' | 'SWIPE';

@Injectable()
export class RabbitMqService {
    private connection: amqp.Connection;

    private taskChannel: amqp.Channel = null;
    private taskQueueName = 'task_queue';

    constructor(private config: AppConfig, private ticketService: TicketService) {}

    async connect(): Promise<void> {
        this.connection = await amqp.connect(
            'amqp://' + this.config.RABBIT_USERNAME + ':' + this.config.RABBIT_PASSWORD + '@' + this.config.RABBIT_URL + ':5672'
        );

        this.taskChannel = await this.connection.createChannel();
        await this.taskChannel.assertQueue(this.taskQueueName, { durable: true });
    }

    async sendMessage(message: string, engine: EngineType): Promise<string> {
        const ticket = this.ticketService.generateTicket();
        if(!this.taskChannel) {
            await this.connect();
        }

        await this.taskChannel.sendToQueue(
            this.taskQueueName, 
            Buffer.from(JSON.stringify({
                pattern: `task-${engine}`,
                ticket: ticket,
                data: message
            })), 
            { persistant: true }
        );
        return ticket;
    }

    async closeConnection(): Promise<void> {
        await this.connection.close();
    }
}