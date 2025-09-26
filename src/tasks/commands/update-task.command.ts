export class UpdateTaskCommand {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly completed: boolean,
  ) {}
}