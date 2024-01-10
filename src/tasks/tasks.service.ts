import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: Task['id']) {
    const result = this.tasks.find(task => task.id === id);

    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }

    return result;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const targetIndex = this.tasks.findIndex(task => task.id === id);
    if (targetIndex !== -1) {
      this.tasks.splice(targetIndex, 1);
    }
  }

  updateTaskStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = newStatus;
    return task;
  }
}
