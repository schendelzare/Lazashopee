import { useRouter } from "next/navigation";
import { AiFillTag } from "react-icons/ai";

const ProductList = ({ data }) => {
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
                className="prodlist "
                onClick={handleProductData.bind(null, item)}
              >
                <div className="prod_image ">
                  <img
                    src={item.image}
                    alt="display picture"
                    className="rounded-md max-h-[130px] p-1 "
                  />
                </div>
                <div className="flex prodlist_card overflow-hidden  text-sm gap-4 ">
                  <label className="font-semibold w-[160px] truncate ">
                    {item.product_name}
                  </label>
                  <span className="flex-center truncate text-primary-orange font-medium bg-orange-100 rounded-lg  w-auto gap-1 ">
                    <AiFillTag size={15} className="" /> $
                    {item.product_price.toFixed(2)}
                  </span>
                  <span></span>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default ProductList;
