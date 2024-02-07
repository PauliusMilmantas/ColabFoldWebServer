import { Injectable } from "@nestjs/common";
import { Engine } from "./engine.interface";

@Injectable()
export class SwipeService implements Engine {
    query(sequence: string): string {
        return sequence;
    }
}