interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  colors: string[];
}
export const ProductCard = ({
  name,
  image,
  price,
  colors,
}: ProductCardProps) => {
  return (
    <div className="w-[200] h-max p-4 bg-secondary/60 border border-border shadow-inner shadow-muted rounded-xl">
      <img
        src={image ?? ""}
        alt="shoe image"
        className="w-[180px] h-[230px] rounded-2xl"
      />
      <div className="mt-1 flex flex-col">
        <span className="text-lg font-semibold text-card-foreground truncate break-words max-w-[170px]">
          {name}
        </span>
        <div className="flex items-center gap-x-2 mt-2">
          {colors.map((item: string, index: number) => (
            <div
              style={{
                backgroundColor: item,
              }}
              className="rounded-full w-3 h-3"
              key={index}
            ></div>
          ))}
        </div>
        <span className="text-green-400 font-bold my-2">{price} $</span>
        {/*  <Button>Add to Cart</Button> */}
      </div>
    </div>
  );
};
