export type Product = {
    id: number,
    name: string,
    description: string,
    defaultImage: string,
    images: string[],
    price: number,
    discount: number,
};

export type ProductToAdd = Pick<Product, 'id' | 'name'>;
export type CartItem = Pick<Product, 'name'> &  { amount: number };
