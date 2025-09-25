import { GetTaskDto } from '../dto/get-task.dto';

export class GetTaskQuery {
  constructor(
    public readonly id: GetTaskDto,
    public readonly userId: number,
  ) {}
}