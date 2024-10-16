import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductUseCase } from './use-cases/create-product.usecase';
import { CreateProductDTO } from './product.dto';
import { ListProductsUseCase } from './use-cases/list-product.usecase';
import { Auth, Role } from 'src/decorators/auth.decorator';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
  ) {}

  @Auth(Role.ADMIN)
  @Post('')
  async create(@Body() data: CreateProductDTO) {
    return await this.createProductUseCase.execute(data);
  }

  @Auth(Role.ADMIN, Role.USER)
  @Get('')
  async list() {
    return await this.listProductsUseCase.execute();
  }
}
