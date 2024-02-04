import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfig {
    public RABBIT_USERNAME: string;
    public RABBIT_PASSWORD: string;
    public RABBIT_URL: string;

    constructor(private configService: ConfigService) {
        this.RABBIT_USERNAME = this.configService.getOrThrow<string>('RABBIT_USERNAME');
        this.RABBIT_PASSWORD = this.configService.getOrThrow<string>('RABBIT_PASSWORD');
        this.RABBIT_URL = this.configService.getOrThrow<string>('RABBIT_URL');
    }
}