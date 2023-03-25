import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}
  async findAll() {
    return await this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = await new this.customerModel(data);
    return newCustomer.save();
  }

  async update(id: string, changes: UpdateCustomerDto) {
    const customer = await this.customerModel
      .findByIdAndUpdate(
        id,
        {
          $set: changes,
        },
        { new: true },
      )
      .exec();
    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    return customer;
  }

  remove(id: string) {
    return this.customerModel.findByIdAndRemove(id);
  }
}
