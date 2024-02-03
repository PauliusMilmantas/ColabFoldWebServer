import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AppConfig } from "./config/app.config";

@Injectable()
export class BearerGuard implements CanActivate {
    private limitCounter: Map<string, number> = new Map();

    constructor(private config: AppConfig) { }

    async canActivate(content: ExecutionContext): Promise<boolean> {
        const token: string = content.switchToHttp().getRequest().headers.authorization?.replace('Bearer ', '');

        if(this.config.USER_TOKENS.includes(token)) {
            // Check if limit was not reached
            if(this.limitCounter.has(token)) {
                const count = this.limitCounter.get(token);
                if(count >= this.config.DEFAULT_TOKEN_LIMIT) {
                    throw new UnauthorizedException('User has reached it\'s limits');
                } else {
                    this.limitCounter.set(token, count + 1);
                    return true;
                }
            } else {
                this.limitCounter.set(token, 1);
                return true;
            }
        } else if(token === this.config.ADMIN_TOKEN) {
            return true;
        }

        throw new UnauthorizedException('Token was not recognised');
    }
}