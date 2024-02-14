import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, Product, RootState, SortBy } from "./types";

import { data } from "../../data/data";

const initialState: RootState = {
  sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
  colors: ["gray", "white", "black", "green", "yellow"],
  products: {
    allProducts: data,
    filteredProducts: data,
  },
  filters: {
    priceRange: [0, 200],
    size: 0,
    sortBy: SortBy.ALL,
    colors: [],
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilters(state, action: PayloadAction<Partial<FilterState>>) {
      state.filters = { ...state.filters, ...action.payload };
      // update filtered products based on the new filters
      state.products.filteredProducts = filterProducts(
        state.products.allProducts,
        state.filters
      );
    },
    sortProducts(state, action: PayloadAction<SortBy>) {
      state.filters.sortBy = action.payload;
      state.products.filteredProducts = sortProductsByPrice(
        state.products.filteredProducts,
        action.payload
      );
    },
  },
});

export const sortProductsByPrice = (
  products: Product[],
  sortBy: SortBy
): Product[] => {
  if (sortBy === SortBy.LOW_TO_HIGH) {
    return [...products].sort((a, b) => a.price - b.price);
  } else if (sortBy === SortBy.HIGH_TO_LOW) {
    return [...products].sort((a, b) => b.price - a.price);
  } else {
    return products;
  }
};
const filterProducts = (
  products: Product[],
  filters: FilterState
): Product[] => {
  let filteredProducts = products;

  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
  );

  if (filters.size !== 0) {
    filteredProducts = filteredProducts.filter((product) =>
      product.size.includes(filters.size)
    );
  }

  if (filters.colors.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.colors.every((color) => product.colors.includes(color))
    );
  }

  return filteredProducts;
};

export const { updateFilters, sortProducts } = filterSlice.actions;
export default filterSlice.reducer;
