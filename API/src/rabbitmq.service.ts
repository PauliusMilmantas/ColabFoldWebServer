import { BadRequestException, Injectable } from "@nestjs/common";
import * as amqp from 'amqplib';
import { AppConfig } from "./config/app.config";

export type EngineType = 'MMseq2' | 'SWIPE';

@Injectable()
export class RabbitMqService {
    private connection: amqp.Connection;

    private taskChannel: amqp.Channel = null;
    private taskQueueName: string = 'task_queue';
    private databaseTypes: string[] = ['uniref50', 'uniref90', 'uniref100'];

    constructor(private config: AppConfig) {}

    async connect(): Promise<void> {
        this.connection = await amqp.connect(
            'amqp://' + this.config.RABBIT_USERNAME + ':' + this.config.RABBIT_PASSWORD + '@' + this.config.RABBIT_URL + ':5672'
        );

        this.taskChannel = await this.connection.createChannel();
        await this.taskChannel.assertQueue(this.taskQueueName, { durable: true });
    }

    async sendMessage(ticket: string, message: string, engine: EngineType, dbType: string): Promise<string> {
        if(!this.databaseTypes.includes(dbType)) throw new BadRequestException('Database not found. (Ex. uniref50, uniref90, uniref100)');
        
        if(!this.taskChannel) {
            await this.connect();
        }

        await this.taskChannel.sendToQueue(
            this.taskQueueName, 
            Buffer.from(JSON.stringify({
                pattern: `task-${engine}`,
                ticket: ticket,
                data: message,
                dbType: dbType
            })), 
            { persistant: true }
        );
        return ticket;
    }

    async closeConnection(): Promise<void> {
        await this.connection.close();
    }
}