import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/entities/task.entity';
import { usersData, tasksData } from './seed-data';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  about(): string {
    return 'This is a simple task management API built with NestJS and TypeORM by Jorge Mendes.';
  }

  async seed() {
    await this.dataSource.transaction(async (db) => {
      const users = db.create(User, usersData);
      await db.save(users);

      const tasks = db.create(Task, tasksData);
      await db.save(tasks);
    });
  }
}
