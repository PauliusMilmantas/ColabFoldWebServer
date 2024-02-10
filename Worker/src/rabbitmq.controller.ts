import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, RmqContext } from "@nestjs/microservices";
import { SwipeService } from "./services/swipe.service";
import { ResultsLoggerService } from "./resultsLogger.service";
import { SwipeConverter } from "./converters/swipe-converter.service";

type MessageContent = {
    pattern: string;
    ticket: string;
    data: string;
};

@Controller()
export class RabbitMqController {

    constructor(
        private logger: ResultsLoggerService,
        private swipe: SwipeService,
        private swipeConverter: SwipeConverter
    ) {}

    @EventPattern('task-MMseq2')
    async handleMMseq2(@Ctx() context: RmqContext) {
        const content: MessageContent = this.retrieveMessage(context);
        console.log('Received MMseq2 ticket with id: ', content.ticket);
    }

    @EventPattern('task-SWIPE')
    async handleSWIPE(@Ctx() context: RmqContext) {
        const content: MessageContent = this.retrieveMessage(context);
        console.log('Received SWIPE ticket with id: ', content.ticket);

        // Executing SWIPE program
        let results = await this.swipe.query(content.data);
        
        // Trasforming the results, because SWIPE returns wrong format
        results = this.swipeConverter.convert(results);

        // Sending results back to the main API
        console.log('Sending results back for ticket: ', content.ticket);
        await this.logger.closeTicket(content.ticket, results);
    }

    private retrieveMessage(context: RmqContext): MessageContent {
        const message = context.getMessage();
        context.getChannelRef().ack(message);
        return JSON.parse(message.content.toString());
    }
}