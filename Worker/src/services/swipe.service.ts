import { Injectable } from "@nestjs/common";
import { Engine } from "./engine.interface";

@Injectable()
export class SwipeService implements Engine {
    private util = require('util');
    private exec = this.util.promisify(require('child_process').exec)

    async query(sequence: string, dbType: string): Promise<string> {
        await this.exec(`echo "${sequence}" >> seq.txt`);
        const { stdout, err } = await this.exec('/app/engines/swipe/swipe/swipe -i /app/seq.txt -b 500 -d /app/databases/' + dbType + '/' + dbType, { maxBuffer: 1024 * 1024 * 1024 });
        if(err) console.log(`Error executing SWIPE: ${err}`);
        await this.exec('rm /app/seq.txt');
        return stdout;
    }
}