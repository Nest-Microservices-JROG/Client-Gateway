import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: envs.productServiceName,
        transport: Transport.TCP,
        options: {
          host: envs.productServiceHost,
          port: envs.productServicePort
        }
      }
    ])
  ],
})
export class ProductsModule { }
