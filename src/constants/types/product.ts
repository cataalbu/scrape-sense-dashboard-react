interface Price {
  price: number;
  date: string;
}
export interface Product {
  id: string;
  name: string;
  imageURL: string;
  websiteId: string;
  website: {
    id: string;
    name: string;
  };
  prices: Price[];
}

export interface ProductListDto {
  data: Omit<Product, 'prices'>[];
  count: number;
  pageTotal: number;
}
