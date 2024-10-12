import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserAddRoleDTO, UserCreateDTO } from './user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UpdateAddRoleUserUseCase } from './use-cases/update-add-role-user.usecase';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

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

  @UseGuards(AuthGuard)
  @Put('/roles')
  async updateAddRole(@Request() request, @Body() data: UpdateUserAddRoleDTO) {
    return await this.updateAddRoleUserUseCase.execute({
      _id: request.user.sub,
      roles: data.roles,
    });
  }
}
