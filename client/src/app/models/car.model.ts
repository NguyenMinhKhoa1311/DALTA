import { Category } from './category.model';
import { Manufacturer } from './manufacturer.model';
import { Storage } from './storage.model';

export interface Car {
  _id: string;
  carId: string;
  name: string;
  model: string;
  categoryId: Category;
  manufacturerId: Manufacturer;
  ownerId: string;
  price: number;
  description: string;
  image: Storage;
  location: string;
  deleveryService: boolean;
  status: boolean;
  seat: number;
  door: number;
}
