import { Controller, Post, Get, Body, Query, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { CreateTaskCommand } from './commands/create-task.command';
import { GetTasksQuery } from './queries/get-tasks.query';
import { GetTaskQuery } from './queries/get-task.query';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  async create(@Body() dto: CreateTaskDto, @GetUser() user: any) {
    return this.commandBus.execute(new CreateTaskCommand(dto.title, dto.description, user.userId));
  }

  @Get()
  async findAll(@Query() dto: GetTasksDto, @GetUser() user: any) {
    return this.queryBus.execute(new GetTasksQuery(dto, user.userId));
  }

  @Get(':id')
async findOne(@Param() dto: GetTaskDto, @GetUser() user: any) {
  return this.queryBus.execute(new GetTaskQuery(dto, user.userId));
}
}
