// brand entity class with @Schema @Prop decorator
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUrl } from 'class-validator';
import { Document } from 'mongoose';
@Schema()
export class Brand extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  @IsUrl()
  image: string;
}
export const BrandSchema = SchemaFactory.createForClass(Brand);
