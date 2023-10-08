import { Category } from './category.model';
import { Manufacturer } from './manufacturer.model';

export interface Car {
  carId: string;
  name: string;
  model: string;
  categoryId: Category;
  manufacturerId: Manufacturer;
  ownerId: string;
  price: number;
  description: string;
  image: string;
  location: string;
  deleveryService: boolean;
  status: boolean;
  seat: number;
  door: number;
}
