import { Injectable } from "@nestjs/common";

@Injectable()
export class ReviewService {
    // constructor(
    //     @InjectRepository(ReviewEntity)
    //     private readonly reviewRepo: Repository<ReviewEntity>,
    //     private readonly movieService: MovieService
    // ) {}
    // async create(dto: CreateReviewDTO): Promise<ReviewEntity> {
    //     const { movieId, rating, text } = dto;
    //     if (movieId == "") {
    //         throw new BadRequestException("movieId обязательно!");
    //     }
    //     const movie = await this.movieService.findById(movieId);
    //     if (!movie) {
    //         throw new NotFoundException("Фильм не найден!");
    //     }
    //     const review = this.reviewRepo.create({
    //         text,
    //         rating,
    //         movie
    //     });
    //     return await this.reviewRepo.save(review);
    // }
}
