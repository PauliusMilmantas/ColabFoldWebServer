import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
          urls: ['amqp://admin:admin@rabbit:5672'],
          queue: 'task_queue',
          queueOptions: {
            durable: true,
          },
          noAck: false,
          prefetchCount: 1,
      }
    }
  );
  await app.listen();
}
bootstrap();