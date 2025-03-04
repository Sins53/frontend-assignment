import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../types/types";

const ProductListCard = ({ productDetails }: { productDetails: Product }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <div
      className={`${
        Number(id) === productDetails?.id ? "bg-primary" : "bg-surface"
      } rounded-xl p-4 cursor-pointer transform transition-transform duration-300 hover:translate-y-[-5px]`}
      onClick={() => navigate(`/product/${productDetails?.id}`)}
    >
      <div className="flex items-center mb-4">
        <img
          src={productDetails?.thumbnail}
          alt={productDetails?.title}
          className="w-16 h-16 rounded-lg mr-4"
        />
        <div>
          <h3 className="text-lg font-bold">{productDetails?.title}</h3>
          <p className="text-sm ">{productDetails?.brand ?? "No Brand"}</p>
        </div>
      </div>
      <div className="text-sm">
        <p>
          <span className="font-semibold">Category:</span>
          {productDetails?.category}
        </p>
        <p>
          <span className="font-semibold">Availability:</span>
          <span
            className={`${
              productDetails?.stock > 0 ? "bg-green-500" : "bg-red-500"
            } rounded-lg p-1/2 px-2 ml-2`}
          >
            {productDetails?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>
        <p>
          <span className="font-semibold">Minimum Order Quantity:</span>
          {productDetails?.minimumOrderQuantity}
        </p>
        <p>
          <span className="font-semibold">Price:</span>
          <span className="line-through">${productDetails?.price}</span>
          <span
            className={`${
              Number(id) === productDetails?.id
                ? "text-green-200"
                : "text-primary"
            } ml-2`}
          >
            $
            {(
              productDetails?.price -
              (productDetails?.discountPercentage / 100) * productDetails?.price
            ).toFixed(3)}
          </span>
        </p>
        <p>
          <span className="font-semibold">Rating:</span>
          {productDetails?.rating}/ 5
        </p>
        <p>
          <span className="font-semibold">Stock:</span>
          <span
            className={`${
              productDetails?.stock < 10
                ? "text-red-500"
                : productDetails?.stock < 20
                ? "text-yellow-500"
                : "text-green-500"
            }  ml-2`}
          >
            {productDetails?.stock}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductListCard;
