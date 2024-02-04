import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class RabbitMqController {
    @EventPattern('task')
    async handleMessage(@Ctx() context: RmqContext) {
        const message = context.getMessage();
        const content: {
            pattern: string,
            ticket: string,
            data: string
        } = JSON.parse(message.content.toString());

        context.getChannelRef().ack(message);
        console.log('Received ticket with id: ', content.ticket);
    }
}