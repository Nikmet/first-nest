import { Body, Controller, Post } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDTO } from "./dto/reviews.dto";

@Controller("reviews")
export class ReviewController {
    // constructor(private readonly reviewService: ReviewService) {}

    // @Post()
    // create(@Body() dto: CreateReviewDTO) {
    //     return this.reviewService.create(dto);
    // }
}
