import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, RmqContext } from "@nestjs/microservices";
import { SwipeService } from "./services/swipe.service";
import { ResultsLoggerService } from "./resultsLogger.service";
import { BlastConverter } from "./converters/blast-converter.service";
import { DiamondService } from "./services/diamond.service";
import { DownloadService } from "./services/download.service";

type MessageContent = {
    pattern: string;
    ticket: string;
    data: string;
    dbType: string;
};

@Controller()
export class RabbitMqController {

    constructor(
        private logger: ResultsLoggerService,
        private swipe: SwipeService,
        private diamond: DiamondService,
        private swipeConverter: BlastConverter,
        private downloadService: DownloadService
    ) {}

    @EventPattern('task-DIAMOND')
    async handleDIAMOND(@Ctx() context: RmqContext) {
        const content: MessageContent = this.retrieveMessage(context);
        console.log('Received DIAMOND ticket with id: ', content.ticket);

        // Executing DIAMOND program
        let results = await this.diamond.query(content.data, content.dbType);

        // Trasforming the results, because DIAMOND returns wrong format (BLAST pairwise format)
        results = this.swipeConverter.convert(results);

        // Sending results back to the main API
        console.log('Sending results back for ticket: ', content.ticket);
        await this.logger.closeTicket(content.ticket, results);
    }

    @EventPattern('task-SWIPE')
    async handleSWIPE(@Ctx() context: RmqContext) {
        const content: MessageContent = this.retrieveMessage(context);
        console.log('Received SWIPE ticket with id: ', content.ticket);

        // Executing SWIPE program
        let results = await this.swipe.query(content.data, content.dbType);
        
        // Trasforming the results, because SWIPE returns wrong format (BLAST pairwise format)
        results = this.swipeConverter.convert(results);

        // Sending results back to the main API
        console.log('Sending results back for ticket: ', content.ticket);
        await this.logger.closeTicket(content.ticket, results);
    }

    @EventPattern('download')
    async downloadDatabase(@Ctx() context: RmqContext) {
        const content: MessageContent = this.retrieveMessage(context);
        console.log('Received DOWNLOAD DATABASE ticket with id: ', content.ticket);

        const results = await this.downloadService.downloadDatabase(content.data);

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