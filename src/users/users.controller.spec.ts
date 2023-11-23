import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import exp from 'constants';

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
        return Promise.resolve([
          {
            email,
            password: 'asdf',
          } as User,
        ]);
      },
      remove: (id) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as User);
      },
      update: (id, user) => {
        return Promise.resolve({
          id,
          ...user,
        } as User);
      },
    };
    fakeAuthService = {
      signup: (email, password) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      },
      signin: (email, password) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
    // fakeUserService.findOne = () => null;
    // try {
    //   await controller.findUser('1');
    // } catch (e) {
    //   done();
    // }
  });

  it('findUser return a user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findAllUser return a list of users with the given email', async () => {
    // given
    const users = await controller.findAlluser('asdf@asdf.com');

    // then
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('signin updates sesion object and return user', async () => {
    // given
    const session = { userId: -10 };
    // when
    const user = await controller.signin(
      {
        email: 'asdf@asdf.com',
        password: 'asdf',
      },
      session,
    );
    // then
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
