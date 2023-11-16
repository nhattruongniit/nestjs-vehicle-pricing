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
  Session,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';

// guard
import { AuthGuard } from '../guards/auth.guard';

// services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// dto
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

// decorators
import { CurrentUser } from './decorators/current-user.decorator';

// interceptor
import {
  Serialize,
  // SerializeInterceptor,
} from '../interceptors/serialize.interceptor';
// import { CurrentUserInterceptor } from './interceptors/curent-user.interceptor';

// entity
import { User } from './users.entity';

@Controller('auth')
@Serialize(UserDto) // want to apply this to all routes
// @UseInterceptors(CurrentUserInterceptor) // use interceptor just apply for 1 route
export class UsersController {
  constructor(
    private usersSerivce: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('whoami') // normal way
  // whoAmI(@Session() session: any) {
  //   return this.usersSerivce.findOne(session.userId);
  // }

  @Get('whoami') // using custom decorator
  @UseGuards(AuthGuard) // using guard
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // this.usersSerivce.create(body.email, body.password);
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
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
