import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { FunctionComponent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "./filterSlice.ts";
import { FilterState, SelectorState } from "./types.ts";

interface FilterPanelProps {}

const FilterPanel: FunctionComponent<FilterPanelProps> = () => {
  const dispatch = useDispatch();
  const { colors, filters, sizes } = useSelector((state: SelectorState) => {
    return {
      filters: state.filter.filters,
      colors: state.filter.colors,
      sizes: state.filter.sizes,
    };
  });

  const ref = useRef(null);

  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);

  const handleFilterChange = (
    filterName: keyof FilterState,
    value: unknown
  ) => {
    dispatch(updateFilters({ [filterName]: value }));
  };

  return (
    <div className="w-[270px] rounded-xl sticky top-0 bg-background/20 backdrop-blur-md border border-border h-full p-4">
      <h1 className="text-lg">Filter</h1>
      <h3 className="py-1 font-semibold">Size</h3>
      <div className="px-4 py-2 rounded-xl border border-border">
        <RadioGroup defaultValue="comfortable">
          {sizes.map((size, index) => (
            <div
              className="flex items-center space-x-2 px-4 py-1 hover:bg-secondary/20 rounded"
              key={index}
            >
              <RadioGroupItem
                value={size.toString()}
                id={`size-${size}`}
                onClick={() => {
                  handleFilterChange("size", size);
                }}
              />
              <Label className="w-full" htmlFor={`size-${size}`}>
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <h3 className="py-1 font-semibold mt-4">Color</h3>
      <div className="px-4 rounded-xl border border-border mt-1">
        {colors.map((color: string, index: number) => (
          <div key={index} className="flex gap-x-2 items-center my-5">
            <Checkbox
              id={color}
              onClick={() => {
                let updatedValue: string[] = [];
                if (filters.colors.includes(color)) {
                  updatedValue = filters.colors.filter(
                    (val: string) => val !== color
                  );
                } else {
                  updatedValue = [...filters.colors, color];
                }
                handleFilterChange("colors", updatedValue);
              }}
            />
            <Label htmlFor={color}>{color}</Label>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-4">
        <h3 className="font-semibold">Price</h3>
        <div className="px-4 py-4 rounded-xl border border-border">
          <Slider
            step={10}
            value={priceRange}
            minStepsBetweenThumbs={2}
            min={10}
            max={250}
            ref={ref}
            className="w-[90%] mx-auto mt-2"
            onValueChange={(e: number[]) => {
              setPriceRange(e);
              handleFilterChange("priceRange", e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
