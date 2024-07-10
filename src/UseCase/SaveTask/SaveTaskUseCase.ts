import { Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';
import { Task } from '@prisma/client';

@Injectable()
export default class SaveTaskUseCase 
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      const task = await this.taskRepository.save(dto);
      return task;
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    }
  }
  
}
