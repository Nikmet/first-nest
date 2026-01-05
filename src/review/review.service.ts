import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Review } from "@prisma/client";
import { MovieService } from "src/movie/movie.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReviewDTO } from "./dto/reviews.dto";

@Injectable()
export class ReviewService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly movieService: MovieService
    ) {}
    async create(dto: CreateReviewDTO): Promise<Review> {
        const { movieId, rating, text } = dto;
        if (movieId == "") {
            throw new BadRequestException("movieId обязательно!");
        }
        const movie = await this.movieService.findById(movieId);
        if (!movie) {
            throw new NotFoundException("Фильм не найден!");
        }
        return this.prisma.review.create({
            data: {
                text,
                rating,
                movie: {
                    connect: {
                        id: movie.id
                    }
                }
            }
        });
    }
}
