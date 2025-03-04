import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../types/types";

const ProductListCard = ({ productDetails }: { productDetails: Product }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the route parameter

  return (
    <div
      className={`${
        Number(id) === productDetails.id ? "bg-primary" : "bg-surface"
      } rounded-xl px-4 py-2 cursor-pointer transform transition-transform duration-300 hover:translate-y-[-5px]`}
      onClick={() => navigate(`/product/${productDetails?.id}`)}
    >
      {productDetails?.title}
    </div>
  );
};

export default ProductListCard;
