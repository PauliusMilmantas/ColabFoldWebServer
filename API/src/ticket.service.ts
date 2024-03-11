import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { query } from "express";

export type Ticket = {
    status: TicketStatus;
    query: string;
    results?: string;
};

export enum TicketStatus {
    Pending = 'pending',
    Done = 'done'
};

@Injectable()
export class TicketService {
    private tickets: Map<string, Ticket> = new Map<string, Ticket>();

    generateTicket(query: string): string {
        const ticket = randomUUID();

        this.tickets.set(
            ticket,
            {
                status: TicketStatus.Pending,
                query: query
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

    getTicketQuery(ticket: string) {
        return this.tickets.get(ticket)?.query ?? undefined;
    }

    getTicketWithQuery(query: string): string | null {
        this.tickets.forEach((value: Ticket, key: string, map: Map<string, Ticket>) => {
            if(value.query === query) return key;
        });

        return null;
    }

    closeTicket(ticket: string, data: string) {
        this.tickets.set(
            ticket,
            {
                status: TicketStatus.Done,
                results: data,
                query: this.getTicketQuery(ticket)
            }
        );
    }
}