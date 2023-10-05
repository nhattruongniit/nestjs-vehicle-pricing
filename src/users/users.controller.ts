import { Body, Controller, Post } from '@nestjs/common';

// dto
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log('createUser', body);
  }
}
