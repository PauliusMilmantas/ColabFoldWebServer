import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ResultsLoggerService {
    constructor(private httpService: HttpService) {}

    async closeTicket(ticket: string, data: string) {
        const params = {
            ticket: ticket
        };
        
        await firstValueFrom(
            this.httpService.post(
                'http://api:3000/logResults',
                { 
                    data: data
                },
                { params, timeout: 5000 }
            )
        )
        .catch((err) => {
            console.log(`Error sending back results: ${err}`);
        })
        .then(() => {
            console.log(`Message was sent successfully (ticket: ${ticket})`);
        });
    }
}