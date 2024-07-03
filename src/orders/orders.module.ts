import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: envs.orderServiceName,
        transport: Transport.TCP,
        options: {
          host: envs.orderServiceHost,
          port: envs.orderServicePort
        }
      }
    ])
  ]
})
export class OrdersModule { }
