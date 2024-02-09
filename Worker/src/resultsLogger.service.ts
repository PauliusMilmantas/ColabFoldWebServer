import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ResultsLoggerService {
    constructor(private httpService: HttpService) {}

    async closeTicket(ticket: string, data: string) {
        const params = {
            ticket: ticket,
            data: data
        };
        
        this.httpService.post(
            'http://api:3000/logResults',
            { },
            { params }
        ).subscribe(_ => {
            console.log(`Message was sent successfully (ticket: ${ticket})`);
        });
    }
}