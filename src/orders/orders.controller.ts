import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { envs } from 'src/config/envs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(envs.orderServiceName) private readonly ordersClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id });
  }

  @Get(':status')
  findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('findAllOrders', {
      ...paginationDto,
      status: statusDto.status
    });
  }

  @Patch(':id')
  changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    try {
      return this.ordersClient.send('changeOrderStatus', {
        id,
        status: statusDto.status
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
