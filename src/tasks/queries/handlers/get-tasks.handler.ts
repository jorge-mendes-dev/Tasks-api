import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTasksQuery } from '../get-tasks.query';
import { Task } from '../../entities/task.entity';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  async execute(query: GetTasksQuery) {
    const { query: dto, userId } = query;
    const page = dto.page ?? 1;
    const limit = Math.min(dto.limit ?? 10, 100);

    const qb = this.repo.createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where('task.userId = :userId', { userId });

    if (dto.search) {
      const q = `%${dto.search.toLowerCase()}%`;
      qb.andWhere('(LOWER(task.title) LIKE :q OR LOWER(task.description) LIKE :q)', { q });
    }

    qb.orderBy('task.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 1 };
  }
}
