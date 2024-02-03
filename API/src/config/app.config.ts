import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfig {
    public DEFAULT_TOKEN_LIMIT: number;
    public USER_TOKENS: string[];
    public ADMIN_TOKEN: string;

    constructor(private configService: ConfigService) {
        this.DEFAULT_TOKEN_LIMIT = this.configService.getOrThrow<number>('DEFAULT_TOKEN_LIMIT');
        this.USER_TOKENS = this.configService.getOrThrow<string[]>('USER_TOKENS');
        this.ADMIN_TOKEN = this.configService.getOrThrow<string>('ADMIN_TOKEN');
    }
}