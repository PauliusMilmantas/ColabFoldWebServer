import { Injectable } from "@nestjs/common";

@Injectable()
export class DownloadService {
    private util = require('util');
    private exec = this.util.promisify(require('child_process').exec)

    async downloadDatabase(url: string): Promise<string> {
        return await this.exec(`wget ${url} -P /app/databases`);
    }
}