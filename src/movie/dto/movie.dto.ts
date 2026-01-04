import { IsArray, IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from "class-validator";

export class MovieDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1902)
    @Max(new Date().getFullYear())
    releaseYear: number;

    @IsString()
    imageUrl: string

    @IsArray()
    @IsUUID("4", { each: true })
    actorIds: string[];
}
