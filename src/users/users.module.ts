import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// auth
import { AuthService } from './auth.service';

// users
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
