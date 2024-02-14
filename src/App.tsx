import { useSelector } from "react-redux";
import { ProductCard } from "./components/card";
import { SelectSortBy } from "./components/sort-by-select";
import FilterPanel from "./features/filter/filter-panel";
import { Product, SelectorState } from "./features/filter/types";

function App() {
  const filteredProducts = useSelector(
    (state: SelectorState) => state.filter.products.filteredProducts
  );

  return (
    <main>
      <div className="container mx-auto flex flex-row h-screen gap-8 relative">
        <FilterPanel />
        <div className="w-full flex-1 p-8 rounded-2xl overflow-y-auto border border-border h-screen backdrop-blur-sm bg-background/20">
          <SelectSortBy />
          <div className="w-full flex-wrap gap-5 flex mt-12">
            {filteredProducts.length === 0 && (
              <h1 className="m-auto text-2xl text-secondary-foreground">
                No items found
              </h1>
            )}
            {filteredProducts.map(
              ({ name, image, price, id, colors }: Product) => (
                <ProductCard
                  key={id}
                  name={name}
                  image={image}
                  price={price}
                  colors={colors}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 z-[-1] bg-transparent h-screen w-screen"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--muted)), hsl(var(--background)))",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundSize: "50px 50px",
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, hsl(var(--muted)/80%) 25%, hsl(var(--muted)/80%) 26%, transparent 27%, transparent 74%, hsl(var(--muted)/80%) 75%, hsl(var(--muted)/80%) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, hsl(var(--muted)/80%) 25%, hsl(var(--muted)/80%) 26%, transparent 27%, transparent 74%, hsl(var(--muted)/80%) 75%, hsl(var(--muted)/80%) 76%, transparent 77%, transparent)",
          }}
        />
      </div>
    </main>
  );
}

export default App;
