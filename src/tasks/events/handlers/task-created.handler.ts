export class TaskCreatedHandler {
  constructor(public readonly taskId: number, public readonly userId: number) {}
}
