import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { logger } from "./common/middlewares/logger.middleware";
import { ResponseInterceptor } from "./common/interceptors/response.intercepter";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalGuards(new AuthGuard());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());
    app.use(logger);

    const config = new DocumentBuilder()
        .setTitle("Nest Course API")
        .setDescription("Документация к первому приложению на nest на курсе от TeaCoder")
        .setVersion("1.0.0")
        .setContact("Nikmet", "https://github.com/Nikmet", "a@a.ru")
        .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/docs", app, doc, {
        jsonDocumentUrl: "/docs/json",
        yamlDocumentUrl: "/docs/yaml",
        customSiteTitle: "Nest JS API Docs"
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
