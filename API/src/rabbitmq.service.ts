import { Injectable } from "@nestjs/common";
import * as amqp from 'amqplib';
import { randomUUID } from "crypto";
import { AppConfig } from "./config/app.config";

@Injectable()
export class RabbitMqService {
    private connection: amqp.Connection;

    private taskChannel: amqp.Channel = null;
    private resultsChannel: amqp.Channel;

    private taskQueueName = 'task_queue';
    private resultsQueueName = 'results_queue';

    constructor(private config: AppConfig) {}

    async connect(): Promise<void> {
        this.connection = await amqp.connect(
            'amqp://' + this.config.RABBIT_USERNAME + ':' + this.config.RABBIT_PASSWORD + '@' + this.config.RABBIT_URL + ':5672'
        );

        this.taskChannel = await this.connection.createChannel();
        await this.taskChannel.assertQueue(this.taskQueueName, { durable: true });

        this.resultsChannel = await this.connection.createChannel();
        await this.resultsChannel.assertQueue(this.resultsQueueName, { durable: true });
    }

    async sendMessage(message: string): Promise<string> {
        const ticket = randomUUID();
        if(!this.taskChannel) {
            await this.connect();
        }

        await this.taskChannel.sendToQueue(
            this.taskQueueName, 
            Buffer.from(JSON.stringify({
                pattern: 'task',
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