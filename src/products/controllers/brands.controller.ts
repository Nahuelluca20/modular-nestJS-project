import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '@/common';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getProducts() {
    return this.brandsService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOne(@Param('productId', MongoIdPipe) productId: string) {
    return await this.brandsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateBrandDto): Promise<any> {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
