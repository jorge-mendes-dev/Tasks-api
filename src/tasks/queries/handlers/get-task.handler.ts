import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTaskQuery } from '../get-task.query';
import { Task } from '../../entities/task.entity'

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery> {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  async execute(query: GetTaskQuery) {
    const { id, userId } = query;

    return this.repo.findOne({
      where: { id: id.id, user: { id: userId } as any },
      relations: ['user'],
    });
  }
}
