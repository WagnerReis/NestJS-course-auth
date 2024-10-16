import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductUseCase } from './use-cases/create-product.usecase';
import { CreateProductDTO } from './product.dto';
import { Role, Roles } from 'src/decorators/roles.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() data: CreateProductDTO) {
    return await this.createProductUseCase.execute(data);
  }
}
