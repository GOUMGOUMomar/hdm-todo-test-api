import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      const newTask = await this.prisma.task.create({
        data: {
          name: (data as Prisma.TaskCreateInput).name
        },
      });
      return newTask;
    } else {
      const updatedTask = await this.prisma.task.update({
        where: { id: Number(data.id) },
        data: data as Prisma.TaskUpdateInput | Prisma.TaskUncheckedUpdateInput,
      });
      return updatedTask;
    }
  }
}
