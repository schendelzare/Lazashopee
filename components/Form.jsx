import Loader from "@ui/loader";
import { useRouter } from "next/navigation";
import FileBase64 from "react-file-base64";
import React from "react";

const Form = React.memo(
  ({ type, submitHandler, productData, setData, isSubmitting }) => {
    const router = useRouter();
    function cancelHandler() {
      router.push("/profile");
    }

    return (
      <section className=" flex flex-col items-center lg:items-start lg:ml-28 mt-5 ">
        <h1 className="font-extrabold text-xl mx-5 mb-5">
          {type} <span>your item</span>
        </h1>
        <form onSubmit={submitHandler} className="form indent-1 ">
          <label className="form_label">
            <span>Product name</span>
            <input
              value={productData.product_name}
              className="form_input"
              onChange={(e) =>
                setData({ ...productData, product_name: e.target.value })
              }
              required
            />
          </label>
          <label className="form_label">
            <span>Product price</span>
            <input
              value={productData.product_price}
              className="form_input"
              type="number"
              onChange={(e) =>
                setData({ ...productData, product_price: e.target.value })
              }
              required
            />
          </label>
          <label className="form_label">
            <span>Product description</span>
            <textarea
              value={productData.product_description}
              className="form_desc"
              onChange={(e) =>
                setData({ ...productData, product_description: e.target.value })
              }
              required
            />
          </label>
          <label className="form_label">
            <span>Tag</span>
            <input
              value={productData.tag}
              className="form_input"
              onChange={(e) => setData({ ...productData, tag: e.target.value })}
              required
              maxLength={12}
            />
          </label>
          <label className="form_label">
            <span>Image</span>
            {/* <input
            type="file"
            name="file"
            className=""
            placeholder="image url"
            onChange={(e) =>
              setData({ ...productData, image: e.target.files[0] })
            }
            required
          /> */}
            <FileBase64
              multiple={false}
              onDone={({ base64 }) =>
                setData({
                  ...productData,
                  image: base64,
                })
              }
            />
          </label>
          <label className="form_label">
            <span>Quantity</span>
            <input
              value={productData.qty}
              type="number"
              className="form_input"
              onChange={(e) => setData({ ...productData, qty: e.target.value })}
              required
            />
          </label>
          <div className="flex justify-end mx-5 mt-5 ">
            <button
              type="button"
              className="form_button"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button
              className="form_button flex text-center justify-center items-center "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader /> : "Submit"}
            </button>
          </div>
          <div className="flex-center mt-3">
            {productData.image ? (
              <img
                src={productData.image}
                className="h-52 w-52 object-contain border-2 p-1"
              />
            ) : null}
          </div>
        </form>
      </section>
    );
  }
);

export default Form;
