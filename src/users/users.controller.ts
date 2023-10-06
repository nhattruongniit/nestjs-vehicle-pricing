import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';

// dto
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersSerivce: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersSerivce.create(body.email, body.password);
  }
}
