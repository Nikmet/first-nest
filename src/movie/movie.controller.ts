import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDTO } from "./dto/movie.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Movie")
@Controller("movies")
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @ApiOperation({
        summary: "Получить список всех фильмов",
        description: "Этот метод предназначен дял получения всех фильмов из БД"
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Фильмы найдены"
    })
    @Get()
    findAll() {
        return this.movieService.findAll();
    }

    @ApiOperation({
        summary: "Получить фильм по id",
        description: "Этот метод предназначен дял получения фильма по его UUID из БД"
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Фильм найден"
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Фильм не найден"
    })
    @ApiParam({
        name: "id",
        type: "string",
        description: "UUID Фильма"
    })
    @Get(":id")
    findById(@Param("id") id: string) {
        return this.movieService.findById(id);
    }

    @ApiOperation({
        summary: "Создание фильма",
        description: "Этот метод предназначен для добавления фильма в БД"
    })
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                title: { type: "string", example: "Восьмая миля" },
                releaseYear: { type: "number", example: 2003 },
                imageUrl: { type: "string", example: "https://kartinki/asbhgdu0h0f8hewfllbasdlusabald" },
                actorIds: {
                    type: "array",
                    example: ["16a486aa-57f0-47dc-8636-014b277848e4", "16a486aa-57f0-47dc-8636-014b277848e4"]
                }
            }
        }
    })
    @Post()
    create(@Body() dto: MovieDTO) {
        return this.movieService.create(dto);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() dto: MovieDTO) {
        return this.movieService.update(id, dto);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.movieService.delete(id);
    }
}
