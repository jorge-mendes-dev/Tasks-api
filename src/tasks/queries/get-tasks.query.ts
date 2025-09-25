import { GetTasksDto } from '../dto/get-tasks.dto';

export class GetTasksQuery {
  constructor(public readonly query: GetTasksDto, public readonly userId: number) {}
}
