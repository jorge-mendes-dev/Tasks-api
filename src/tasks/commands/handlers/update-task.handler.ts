import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { UpdateTaskCommand } from '../update-task.command';
import { TaskUpdatedEvent } from '../../events/task-updated.event';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    @InjectRepository(Task) 
    private readonly repo: Repository<Task>,
    private readonly eventBus: EventBus,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: UpdateTaskCommand): Promise<void> {
    const { id, title, description, completed } = command;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const task = await queryRunner.manager.findOne(Task, { where: { id } });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      
      task.title = title ?? task.title;
      task.description = description ?? task.description;
      task.completed = completed ?? task.completed;

      await queryRunner.manager.save(task);
      await queryRunner.commitTransaction();

      this.eventBus.publish(new TaskUpdatedEvent(id));

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}