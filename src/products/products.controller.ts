import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { envs } from 'src/config/envs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(envs.natsServiceName) private readonly client: ClientProxy
  ) { }

  @Post()
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProduct);
  }

  @Get()
  getAllProducts(@Query() pagination: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, pagination);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await firstValueFrom(
      this.client.send({ cmd: 'find_one_product' }, { id })
    )
    return product;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    try {
      const prduct = this.client.send({ cmd: 'delete_product' }, { id });
      return prduct;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  updateProduct(@Body() updateProduct: UpdateProductDto, @Param('id', ParseIntPipe) id: number) {
    try {
      const product = this.client.send({ cmd: 'update_product' }, { id, ...updateProduct });
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
