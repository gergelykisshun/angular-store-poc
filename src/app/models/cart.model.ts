export interface ICartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
}
