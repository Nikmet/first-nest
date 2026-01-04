import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateActorDTO } from "./dto/actor.dto";
import { Actor } from "@prisma/client";

@Injectable()
export class ActorService {
    constructor(private readonly prisma: PrismaService) {}
    async create(dto: CreateActorDTO): Promise<Actor> {
        const { name } = dto;
        return await this.prisma.actor.create({
            data: {
                name
            }
        });
    }
}
