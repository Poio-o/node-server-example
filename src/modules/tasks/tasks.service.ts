import { prisma } from '../../config/db.js';
import type { CreateTaskInput, UpdateTaskInput } from './tasks.schema.js';

export async function createTask(data: CreateTaskInput) {
  return prisma.task.create({
    data: {
      title: data.title,
      userId: data.userId,
      ...(data.description !== undefined ? { description: data.description } : {})
    }
  });
}

export async function listTasks() {
  return prisma.task.findMany({
    orderBy: { id: 'asc' }
  });
}

export async function findTaskById(id: number) {
  return prisma.task.findUnique({
    where: { id }
  });
}

export async function updateTask(id: number, data: UpdateTaskInput) {
  return prisma.task.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.done !== undefined ? { done: data.done } : {})
    }
  });
}

export async function deleteTask(id: number) {
  return prisma.task.delete({
    where: { id }
  });
}
