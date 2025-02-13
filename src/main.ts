import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  app.enableCors({
    origin: ['http://localhost:4200','https://dev.lexton.com','*'], // Allow multiple origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('API documentation for the  Portal')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use(helmet());

  await app.listen(process.env.PORT ?? 3000).then(() => { console.log('App is runnig in ' + process.env.PORT); });

}
bootstrap();
