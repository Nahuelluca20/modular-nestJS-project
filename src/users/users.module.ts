import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from '@/products';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema, Order, OrderSchema } from './entities';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [CustomerController, UsersController, OrdersController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
