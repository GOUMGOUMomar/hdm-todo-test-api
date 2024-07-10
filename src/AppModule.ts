import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import TaskController from './Controllers/TaskController';
import { PrismaService } from './PrismaService';
import TaskRepository from './Repositories/TaskRepository';
import UseCaseFactory from './UseCase/UseCaseFactory';
import * as cors from 'cors';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TaskController],
  providers: [PrismaService, TaskRepository, UseCaseFactory],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply CORS middleware to all routeor we can specify the route as we want
    consumer.apply(cors()).forRoutes('*');
  }
}
