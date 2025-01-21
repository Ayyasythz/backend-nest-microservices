import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { isMiddlewareRouteExcluded } from '@nestjs/core/middleware/utils';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package : 'auth',
      protoPath: 'src/auth.proto',
      url: '0.0.0.0:50051'
    }
  })

  app.useGlobalPipes(new ValidationPipe())
  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
