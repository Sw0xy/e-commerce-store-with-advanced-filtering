import { SortBy } from "@/features/filter/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDispatch } from "react-redux";
import { sortProducts } from "@/features/filter/filterSlice";

export const SelectSortBy = () => {
  const dispatch = useDispatch();

  const handleSortChange = (value: string) => {
    let sortBy: SortBy;
    switch (value) {
      case "lth":
        sortBy = SortBy.LOW_TO_HIGH;
        break;
      case "htl":
        sortBy = SortBy.HIGH_TO_LOW;
        break;
      case "all":
        sortBy = SortBy.ALL;
        break;
      default:
        sortBy = SortBy.ALL;
    }
    dispatch(sortProducts(sortBy));
  };

  return (
    <Select onValueChange={(e) => handleSortChange(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="lth">Price: Low-High</SelectItem>
          <SelectItem value="htl">Price: High-Low</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
