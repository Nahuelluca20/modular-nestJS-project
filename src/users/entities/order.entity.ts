import { Product } from '@/products';
import { User } from './user.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
