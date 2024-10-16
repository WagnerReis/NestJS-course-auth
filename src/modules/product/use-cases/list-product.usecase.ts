import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../product.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async execute(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
