import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

// auth
import { AuthService } from './auth.service';

// users
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';

// interceptor
import { CurrentUserInterceptor } from './interceptors/curent-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // CurrentUserInterceptor, // just apply for 1 route
    // apply for all routes of App
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
