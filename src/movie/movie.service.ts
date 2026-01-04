import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MovieDTO } from "./dto/movie.dto";
import { Movie, MoviePoster } from "@prisma/client";

@Injectable()
export class MovieService {
    constructor(private readonly prisma: PrismaService) {}
    async findAll(): Promise<Movie[]> {
        return await this.prisma.movie.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                isAvailable: true
            },
            include: {
                actors: true,
                moviePoster: true
            }
        });
    }
    async findById(id: string): Promise<Movie> {
        const movie = await this.prisma.movie.findFirst({
            where: { id }
        });

        if (movie?.isAvailable == false) {
            throw new HttpException("У вас нет доступа к данному ресурсу!", HttpStatus.FORBIDDEN);
        }
        if (!movie) {
            throw new NotFoundException("Фильм не найден!");
        }
        return movie;
    }

    async create(dto: MovieDTO): Promise<Movie> {
        const { actorIds, releaseYear, title, imageUrl } = dto;

        const actors = await this.prisma.actor.findMany({
            where: {
                id: {
                    in: actorIds
                }
            }
        });

        if (!actors.length || !actors) {
            throw new NotFoundException("Актеры не найдены");
        }

        const poster: MoviePoster | null = null;

        return await this.prisma.movie.create({
            data: {
                title,
                releaseYear,
                moviePoster: imageUrl
                    ? {
                          create: {
                              url: imageUrl
                          }
                      }
                    : undefined,
                actors: {
                    connect: actors.map(a => ({
                        id: a.id
                    }))
                }
            }
        });
    }
    async update(id: string, dto: MovieDTO): Promise<boolean> {
        const movie = await this.findById(id);
        if (movie?.isAvailable == false) {
            throw new HttpException("У вас нет доступа к данному ресурсу!", HttpStatus.FORBIDDEN);
        }
        if (!movie) {
            throw new NotFoundException("Фильм не найден!");
        }
        Object.assign(movie, dto);
        await this.prisma.movie.update({
            where: {
                id
            },
            data: dto
        });
        return true;
    }
    async delete(id: string): Promise<Movie> {
        const movie = await this.findById(id);
        if (movie?.isAvailable == false) {
            throw new HttpException("У вас нет доступа к данному ресурсу!", HttpStatus.FORBIDDEN);
        }
        if (!movie) {
            throw new NotFoundException("Фильм не найден!");
        }
        return await this.prisma.movie.delete({
            where: {
                id
            }
        });
    }
}
