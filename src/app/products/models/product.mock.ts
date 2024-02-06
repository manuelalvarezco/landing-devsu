import { Product } from '../interfaces/product.interface';
import { faker } from '@faker-js/faker';

export const generateOneProduct = (): Product => {
  return {
    id: faker.string.alpha(5),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    logo: faker.image.url(),
    date_release: faker.date.anytime(),
    date_revision: faker.date.anytime(),
  };
}

export const generateManyProduct = (size = 10): Product[] => {
  const products: Product[] = [];
  for (let index = 0; index < size; index++) {
    products.push(generateOneProduct())
  }
  return [...products]
}