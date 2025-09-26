import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';

import { CreateTaskHandler } from './commands/handlers/create-task.handler';
import { GetTasksHandler } from './queries/handlers/get-tasks.handler';
import { GetTaskHandler } from './queries/handlers/get-task.handler';
import { TaskCreatedHandler } from './events/handlers/task-created.handler';
import { UpdateTaskHandler } from './commands/handlers/update-task.handler';
import { DeleteTaskHandler } from './commands/handlers/delete-task.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    CreateTaskHandler, 
    GetTasksHandler, 
    GetTaskHandler, 
    TaskCreatedHandler, 
    UpdateTaskHandler,
    DeleteTaskHandler
  ],
})
export class TasksModule {}
