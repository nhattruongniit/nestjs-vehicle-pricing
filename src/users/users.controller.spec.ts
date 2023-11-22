import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as User);
      },
      find: (email) => {
        return Promise.resolve([{
          email,
          password: 'asdf',
        } as User])
      },
      remove: (id) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as User)
      },
      update: (id, user) => {
        return Promise.resolve({
          id,
          ...user,
        } as User)
      },
    };
    fakeAuthService = {
      signup: (email, password) => {
        return Promise.resolve({
          email,
          password,
        } as User)
      },
      signin: (email, password) => {
        return Promise.resolve({
          email,
          password,
        } as User)
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: fakeUserService,
      }, {
        provide: AuthService,
        useValue: fakeAuthService,  
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  })
});
