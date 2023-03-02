import { Injectable } from '@angular/core';

export class Product {
  Name: string;
  id: number;
}
let products: Product[] = [
  { Name: 'HD Video Player', id: 0 },
  { Name: 'SuperHD Video Player', id: 1 },
  { Name: 'SuperPlasma 50', id: 2 },
  { Name: 'SuperLED 50', id: 3 },
  { Name: 'SuperLED 42', id: 4 },
  { Name: 'SuperLCD 55', id: 5 },
  { Name: 'SuperLCD 42', id: 6 },
  { Name: 'SuperPlasma 65', id: 7 },
  { Name: 'SuperLCD 70', id: 8 },
  { Name: 'Projector Plus', id: 9 },
  { Name: 'Projector PlusHT', id: 10 },
  { Name: 'ExcelRemote IR', id: 11 },
  { Name: 'ExcelRemote Bluetooth', id: 12 },
  { Name: 'ExcelRemote IP', id: 13 },
];

@Injectable()
export class AppService {
  getProducts(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products);
      }, 1000);
    });
  }

  insertProduct(product: Product): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        products.push(product);
        resolve(products);
      }, 1000);
    });
  }
}
