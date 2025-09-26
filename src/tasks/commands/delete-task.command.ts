export class DeleteTaskCommand {
  constructor(
    public readonly id: number,
    public readonly userId: number
  ) {}
}