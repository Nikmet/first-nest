import { Body, Controller, Get, Post, UseFilters, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { AppService } from "./app.service";
import { StringToLowerCasePipe } from "./common/pipes/string-to-lower-case.pipe";
import { AuthGuard } from "./common/guards/auth.guard";
import { UserAgent } from "./common/decorators/user-agent.decoraator";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): { message: string } {
        return this.appService.getHello();
    }

    @UsePipes(StringToLowerCasePipe)
    @Post()
    create(@Body("title") title: string) {
        return title;
    }

    @UseGuards(AuthGuard)
    @Get("@me")
    getProfile(@UserAgent() agent: string) {
        return {
            id: 1,
            email: "a@a.ru",
            agent
        };
    }
}
