import { Injectable } from "@nestjs/common";
import * as amqp from 'amqplib';
import { AppConfig } from "./config/app.config";

@Injectable()
export class RabbitService {
    private connection: amqp.Connection;

    private resultsChannel: amqp.Channel;
    private resultsQueueName = 'results_queue';

    constructor(private config: AppConfig) {}

    async connect(): Promise<void> {
        this.connection = await amqp.connect(
            'amqp://' + this.config.RABBIT_USERNAME + ':' + this.config.RABBIT_PASSWORD + '@' + this.config.RABBIT_URL + ':5672'
        );

        this.resultsChannel = await this.connection.createChannel();
        await this.resultsChannel.assertQueue(this.resultsQueueName, { durable: true });
    }

    async sendMessage(ticket: string) {
        if(!this.resultsChannel) {
            await this.connect();
        }

        // await this.resultsChannel.sendToQueue(
            // this.resultsQueueName, 
            // Buffer.from(JSON.stringify({
            //     pattern: `task-${engine}`,
            //     ticket: ticket,
            //     data: message
            // })), 
            // { persistant: true }
        // );
        // return ticket;
    }

    async closeConnection(): Promise<void> {
        await this.connection.close();
    }
}