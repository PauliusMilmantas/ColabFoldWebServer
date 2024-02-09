import { Injectable } from "@nestjs/common";
import { Engine } from "./engine.interface";

@Injectable()
export class SwipeService implements Engine {
    private util = require('util');
    private exec = this.util.promisify(require('child_process').exec)

    async query(sequence: string): Promise<string> {
        await this.exec(`echo "${sequence}" >> seq.txt`);
        const stdout2 = await this.exec('/app/engines/swipe/swipe/swipe -i /app/seq.txt -d /app/databases/uniref50/uniref50');
        await this.exec('rm /app/seq.txt');
        return stdout2;
    }
}