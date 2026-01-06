import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateReviewDTO {
    @ApiProperty({
        description: "Текст отзыва",
        example: "Очень классный фильм, очень нравиться",
        type: String
    })
    @IsString()
    text: string;

    @ApiProperty({
        description: "Оценка для фильма",
        example: 7.9,
        type: Number
    })
    @IsNumber()
    @Min(0)
    @Max(10)
    rating: number;

    @ApiProperty({
        description: "ID фильма",
        example: "16a486aa-57f0-47dc-8636-014b277848e4",
        type: String
    })
    @IsUUID("4")
    movieId: string;
}
