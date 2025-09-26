import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { DeleteTaskCommand } from '../delete-task.command';
import { Task } from '../../entities/task.entity';
import { NotFoundException } from '@nestjs/common';
import { TaskDeletedEvent } from '../../events/task-deleted.event';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private dataSource: DataSource,
    private eventBus: EventBus,
  ) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    const { id } = command;

     const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

    try {
      const task = await queryRunner.manager.findOne(Task, { where: { id } });
      
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      await queryRunner.manager.delete(Task, id);
      await queryRunner.commitTransaction();

      this.eventBus.publish(new TaskDeletedEvent(id));
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}