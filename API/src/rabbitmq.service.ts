import { Injectable } from "@nestjs/common";
import * as amqp from 'amqplib';
import { AppConfig } from "./config/app.config";

export type EngineType = 'MMseq2' | 'SWIPE';

@Injectable()
export class RabbitMqService {
    private connection: amqp.Connection;

    private taskChannel: amqp.Channel = null;
    private taskQueueName = 'task_queue';

    constructor(private config: AppConfig) {}

    async connect(): Promise<void> {
        this.connection = await amqp.connect(
            'amqp://' + this.config.RABBIT_USERNAME + ':' + this.config.RABBIT_PASSWORD + '@' + this.config.RABBIT_URL + ':5672'
        );

        this.taskChannel = await this.connection.createChannel();
        await this.taskChannel.assertQueue(this.taskQueueName, { durable: true });
    }

    async sendMessage(ticket: string, message: string, engine: EngineType): Promise<string> {
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