import { Body, Controller, Post, Put } from '@nestjs/common';
import { UpdateUserAddRoleDTO, UserCreateDTO } from './user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UpdateAddRoleUserUseCase } from './use-cases/update-add-role-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateAddRoleUserUseCase: UpdateAddRoleUserUseCase,
  ) {}

  @Post('/')
  async create(@Body() data: UserCreateDTO) {
    return await this.createUserUseCase.execute(data);
  }

  @Put('/roles')
  async updateAddRole(@Body() data: UpdateUserAddRoleDTO) {
    return await this.updateAddRoleUserUseCase.execute(data);
  }
}
