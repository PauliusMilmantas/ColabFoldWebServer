import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, RmqContext } from "@nestjs/microservices";

type MessageContent = {
    pattern: string;
    ticket: string;
    data: string;
};

@Controller()
export class RabbitMqController {
    @EventPattern('task-MMseq2')
    async handleMMseq2(@Ctx() context: RmqContext) {
        const content = this.retrieveMessage(context);
        console.log('Received MMseq2 ticket with id: ', content.ticket);
    }

    @EventPattern('task-SWIPE')
    async handleSWIPE(@Ctx() context: RmqContext) {
        const content = this.retrieveMessage(context);
        console.log('Received SWIPE ticket with id: ', content.ticket);
    }

    private retrieveMessage(context: RmqContext): MessageContent {
        const message = context.getMessage();
        context.getChannelRef().ack(message);
        return JSON.parse(message.content.toString());
    }
}