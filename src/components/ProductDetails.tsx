import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";
import { formatDateTime } from "../helpers/date";
import { Product } from "../types/types";
import Spinner from "./Spinner";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const productDetails = await getProductById(Number(id));
          setProduct(productDetails);
          setSelectedImage(productDetails.images[0]);
        } catch (err) {
          alert("Failed to fetch product details.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-full">
        Product not found, Please Select item from Product list.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 rounded-xl max-w-2xl mx-auto mt-8">
      <div className="w-full mb-4">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-64 object-contain rounded-lg"
            loading="lazy"
          />
        )}
      </div>
      {product?.images?.length > 1 ? (
        <div className="w-full flex justify-center flex-wrap gap-2 mb-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer bg-surface px-4 py-2"
              onClick={() => setSelectedImage(image)}
              loading="lazy"
            />
          ))}
        </div>
      ) : null}

      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-lg text-gray-700 mb-4">{product.description}</p>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Brand:</span>
          {product.brand ?? "No Brand"}
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Category:</span> {product.category}
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Price:</span>
          <span className="line-through">${product.price}</span>
          <span className="text-green-600">
            $
            {(
              product.price -
              (product.discountPercentage / 100) * product.price
            ).toFixed(3)}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Rating:</span> {product.rating} / 5
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Stock:</span>
          <span
            className={`${
              product.stock < 10
                ? "text-red-500"
                : product.stock < 20
                ? "text-yellow-500"
                : "text-green-500"
            }  ml-2`}
          >
            {product.stock}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">MOQ:</span>
          {product.minimumOrderQuantity}
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Availability:</span>
          <span
            className={`${
              product.stock > 0 ? "bg-green-500" : "bg-red-500"
            } rounded-lg p-1/2 px-2 mt-2`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Dimensions:</span>
          {`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} mm`}
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Weight:</span> {product.weight} kg
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Warranty:</span>
          {product.warrantyInformation}
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Shipping Info:</span>
          {product.shippingInformation}
        </div>
        <div className="flex flex-col items-center p-2 bg-surface rounded-lg shadow-md">
          <span className="font-semibold">Return Policy:</span>
          {product.returnPolicy}
        </div>
      </div>

      <div className="mt-6 w-full">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="mb-4 p-4 bg-surface rounded-lg">
              <p>
                <span className="font-semibold">Date:</span>
                {formatDateTime(review.date)}
              </p>
              <p>
                <span className="font-semibold">Reviewer:</span>
                {review.reviewerName} ({review.reviewerEmail})
              </p>
              <p>
                <span className="font-semibold">Comment:</span> {review.comment}
              </p>
              <p>
                <span className="font-semibold">Rating:</span> {review.rating} /
                5
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
