import { GetTaskHandler } from './get-task.handler';
import { GetTaskQuery } from '../get-task.query';
import { Task } from '../../entities/task.entity';
import { Repository } from 'typeorm';

describe('GetTaskHandler', () => {
  let handler: GetTaskHandler;
  let repo: Partial<Repository<Task>>;

  beforeEach(() => {
    repo = {
      findOne: jest.fn(),
    };
    handler = new GetTaskHandler(repo as Repository<Task>);
  });

  it('should return the task for given id and userId', async () => {
    const mockTask = { id: 1, title: 'Test', user: { id: 2 } } as Task;
    (repo.findOne as jest.Mock).mockResolvedValue(mockTask);

    const query = new GetTaskQuery({ id: 1 }, 2);
    const result = await handler.execute(query);

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 1, user: { id: 2 } as any },
      relations: ['user'],
    });
    expect(result).toBe(mockTask);
  });
});