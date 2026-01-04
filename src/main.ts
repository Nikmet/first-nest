import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    console.log("ENGINE:", process.env.PRISMA_CLIENT_ENGINE_TYPE); // должно быть binary
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
