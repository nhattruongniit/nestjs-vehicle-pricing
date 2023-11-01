import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';

// services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// dto
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

// interceptor
import {
  Serialize,
  // SerializeInterceptor,
} from '../interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserDto) // want to apply this to all routes
export class UsersController {
  constructor(
    private usersSerivce: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    // this.usersSerivce.create(body.email, body.password);
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto) // just apply this to this route
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersSerivce.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAlluser(@Query('email') email: string) {
    return this.usersSerivce.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersSerivce.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersSerivce.update(parseInt(id), body);
  }
}
