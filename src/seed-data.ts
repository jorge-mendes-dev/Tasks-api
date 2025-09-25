import { User } from './users/user.entity';
import { Task } from './tasks/entities/task.entity';

export const usersData = [
  { email: 'alice@mail.com', password: '123456', isActive: true },
  { email: 'bob@mail.com', password: '123456', isActive: true },
  { email: 'charlie@mail.com', password: '123456', isActive: true },
  { email: 'david@mail.com', password: '123456', isActive: true },
  { email: 'eve@mail.com', password: '123456', isActive: true }
];

export const tasksData = [
  { title: 'Task 1', description: 'Description 1', user: usersData[0] },
  { title: 'Task 2', description: 'Description 2', user: usersData[1] },
  { title: 'Task 3', description: 'Description 3', user: usersData[2] },
  { title: 'Task 4', description: 'Description 4', user: usersData[3] },
  { title: 'Task 5', description: 'Description 5', user: usersData[4] },
  { title: 'Task 6', description: 'Description 6', user: usersData[0] },
  { title: 'Task 7', description: 'Description 7', user: usersData[1] },
  { title: 'Task 8', description: 'Description 8', user: usersData[2] },
  { title: 'Task 9', description: 'Description 9', user: usersData[3] },
  { title: 'Task 10', description: 'Description 10', user: usersData[4] },
];