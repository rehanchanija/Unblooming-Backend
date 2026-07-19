import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so the Next.js frontend can access the API
  app.enableCors({
    origin: true, // Allow all origins in development, or specify your frontend URL in production
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
