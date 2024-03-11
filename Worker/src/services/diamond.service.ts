import { Injectable } from "@nestjs/common";
import { Engine } from "./engine.interface";

@Injectable()
export class DiamondService implements Engine {
    private util = require('util');
    private exec = this.util.promisify(require('child_process').exec)

    async query(sequence: string): Promise<string> {
        await this.exec(`echo ">query protein\n${sequence}" >> input.fasta`);

        const { stdout, err } = await this.exec('/app/engines/diamond/diamond blastp -d /app/databases/uniref50/uniref50.fasta -q input.fasta --sensitive --outfmt 0', { maxBuffer: 1024 * 1024 * 1024 });
        if(err) console.log(`Error executing DIAMOND: ${err}`);

        await this.exec('rm /app/input.fasta');

        return stdout;
    }
}