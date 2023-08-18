import { useRouter } from "next/navigation";
import { AiFillTag } from "react-icons/ai";
import React from "react";

const ProductList = React.memo(({ data }) => {
  const router = useRouter();

  const handleProductData = (item) => {
    router.push(`/products/product-data?prodId=${item._id}`);
  };

  return (
    <div className="place-content-center">
      <ul className="prod_ul tracking-tight">
        {data
          ? data.map((item) => (
              <li
                key={item._id}
                className="prodlist group relative"
                onClick={handleProductData.bind(null, item)}
              >
                <div className="prod_image ">
                  <img
                    src={item.image}
                    alt="display picture"
                    className="rounded-md max-h-[130px] p-1 group-hover:scale-125 transition-transform duration-500"
                  />
                </div>
                <div className="">
                  <div className="flex prodlist_card overflow-hidden  text-sm gap-4 ">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 "></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-semibold text-center translate-y-[50%] group-hover:translate-y-[0] transition-all ease-in-out ">
                      <span className="truncate w-[100px] ">
                        {item.product_name}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-center truncate  font-medium  rounded-lg  w-auto gap-1 mt-2">
                        <AiFillTag size={15} className="" /> $
                        {item.product_price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
});

export default ProductList;
