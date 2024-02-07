import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

export type Ticket = {
    ticket: string;
    status: TicketStatus;
};

export enum TicketStatus {
    Pending = 'pending',
    Done = 'done'
};

@Injectable()
export class TicketService {

    private tickets: Ticket[] = [];

    generateTicket(): string {
        const ticket = randomUUID();

        this.tickets.push({
            ticket: ticket,
            status: TicketStatus.Pending
        })

        return ticket;
    }

    getTicketStatus(ticket: string): TicketStatus {
        return this.tickets.find(t => t.ticket === ticket)?.status;
    }
}