import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  quantity: number;
  @Prop()
  code: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
