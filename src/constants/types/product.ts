interface Price {
  price: number;
  date: Date;
}
export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  websiteId: string;
  website: {
    id: string;
    name: string;
  };
  prices: Price[];
}
