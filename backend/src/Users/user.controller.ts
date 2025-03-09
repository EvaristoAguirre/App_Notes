import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/Entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(page: number = 1, limit: number = 10): Promise<User[]> {
    return this.userService.getAllUsers(page, limit);
  }
}
