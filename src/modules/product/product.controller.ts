import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductUseCase } from './use-cases/create-product.usecase';
import { CreateProductDTO } from './product.dto';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { ListProductsUseCase } from './use-cases/list-product.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
  ) {}

  @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() data: CreateProductDTO) {
    return await this.createProductUseCase.execute(data);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('')
  async list() {
    return await this.listProductsUseCase.execute();
  }
}
