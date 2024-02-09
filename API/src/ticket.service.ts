import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

export type Ticket = {
    status: TicketStatus;
    results?: string;
};

export enum TicketStatus {
    Pending = 'pending',
    Done = 'done'
};

@Injectable()
export class TicketService {
    private tickets: Map<string, Ticket> = new Map<string, Ticket>();

    generateTicket(): string {
        const ticket = randomUUID();

        this.tickets.set(
            ticket,
            {
                status: TicketStatus.Pending
            }
        );

        return ticket;
    }

    getTicketStatus(ticket: string): TicketStatus {
        return this.tickets.get(ticket).status;
    }

    getTicketResults(ticket: string) {
        const data: Ticket = this.tickets.get(ticket);
        return data.results ? data.results : data.status;
    }

    closeTicket(ticket: string, data: string) {
        this.tickets.set(
            ticket,
            {
                status: TicketStatus.Done,
                results: data
            }
        );
    }
}