import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMidleware } from './Middlewares/logger.middleware';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentConfig = new DocumentBuilder()
    .setTitle('Gestor de tareas')
    .setDescription('Documentation')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();

  const documentation = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, documentation);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(LoggerMidleware);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  const port = app.getHttpServer().address().port;
  console.log(`Server listening on http://localhost:${port}`);
}
bootstrap();
