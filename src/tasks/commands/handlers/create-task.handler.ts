import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { CreateTaskCommand } from '../create-task.command';
import { TaskCreatedEvent } from '../../events/task-created.event';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
    private readonly eventBus: EventBus,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { title, description, userId } = command;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const task = this.repo.create({
        title,
        description,
        user: { id: userId } as any,
      });

    const saved = await queryRunner.manager.save(task);
    await queryRunner.commitTransaction();
    this.eventBus.publish(new TaskCreatedEvent(saved.id, userId));
    return saved;
    
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
