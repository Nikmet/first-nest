import { Body, Controller, Post } from "@nestjs/common";
import { ActorService } from "./actor.service";
import { CreateActorDTO } from "./dto/actor.dto";

@Controller("actors")
export class ActorController {
    constructor(private readonly actorService: ActorService) {}

    @Post()
    create(@Body() dto: CreateActorDTO) {
        return this.actorService.create(dto);
    }
}
