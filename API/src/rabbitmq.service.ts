import { Injectable } from "@nestjs/common";
import * as amqp from 'amqplib';
import { randomUUID } from "crypto";

@Injectable()
export class RabbitMqService {
    private connection: amqp.Connection;

    private taskChannel: amqp.Channel;
    private resultsChannel: amqp.Channel;

    private taskQueueName = 'task_queue';
    private resultsQueueName = 'results_queue';

    async connect(): Promise<void> {
        this.connection = await amqp.connect('amqp://localhost:5672');

        this.taskChannel = await this.connection.createChannel();
        await this.taskChannel.assertQueue(this.taskQueueName, { durable: true });

        this.resultsChannel = await this.connection.createChannel();
        await this.resultsChannel.assertQueue(this.resultsQueueName, { durable: true });
    }

    async sendMessage(message: string): Promise<string> {
        const ticket = randomUUID();
        await this.taskChannel.sendToQueue(this.taskQueueName, Buffer.from(ticket + ':' + message), { persistant: true });
        return ticket;
    }

    async closeConnection(): Promise<void> {
        await this.connection.close();
    }
}