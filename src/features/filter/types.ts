export interface Product {
  id: number;
  name: string;
  size: number[];
  image: string;
  colors: string[];
  category: string;
  brand: string;
  price: number;
}
export enum SortBy {
  HIGH_TO_LOW = "HIGH_TO_LOW",
  LOW_TO_HIGH = "LOW_TO_HIGH",
  ALL = "ALL",
}
export interface FilterState {
  priceRange: number[];
  colors: string[];
  size: number;
  sortBy: SortBy;
}

export interface SelectorState {
  filter: {
    sizes: number[];
    colors: string[];
    products: {
      allProducts: Product[];
      filteredProducts: Product[];
    };
    filters: FilterState;
  };
}

export interface RootState {
  sizes: number[];
  colors: string[];
  products: {
    allProducts: Product[];
    filteredProducts: Product[];
  };
  filters: FilterState;
}
