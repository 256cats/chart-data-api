import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger } from '@nestjs/common';
import { promMiddleware } from './common/prom';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));

  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();

  instance.set('trust proxy', 1);
  instance.disable('x-powered-by');
  app.enableCors();
  app.use(promMiddleware);
  app.use('/metrics', promMiddleware.metricsMiddleware);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const logger = new Logger('main');

  const port = process.env.SRV_PORT || 3000;
  await app.listen(port).then(() => {
    logger.log(`Listening on port: ${port}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
