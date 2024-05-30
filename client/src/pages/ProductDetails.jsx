import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../helper/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/button";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { slug } = useParams();
  const getProductById = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/get-products/${slug}`
      );
      // console.log("Data ",data.data);
      if (data.success) {
        setProduct(data.data);
      } else {
        setProduct(null);
      }
      console.log("Product ", product);
    } catch (error) {
      //   console.log("Single Product Error: " + error);
    }
  };

  useEffect(() => {
    if (slug) {
      getProductById();
    }
  }, [slug]);
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
        {product ? (
          <>
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-gray-900 mb-4">
                Price: ${product.price}
              </p>
              <p className="text-gray-600 mb-4">Quantity: {product.quantity}</p>
              <Button className="bg-indigo-500 text-white py-2 px-4 rounded-lg">
                Add to Cart
              </Button>
            </div>
            <div className="mt-4">
              <img
                className="w-full h-auto object-cover rounded-lg max-w-xs md:max-w-md lg:max-w-lg"
                src={`${BACKEND_URL}/api/products/get-photo/${product._id}`}
                alt={product.name}
              />
            </div>
          </>
        ) : (
          <p className="text-red-500 text-lg">Product not available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

//  <div>
//       ProductDetails
//       <div className="m-5 border-2">
//         {product ? (
//           <>
//             <div>
//               <h2>{product.name}</h2>
//               <h2>{product.description}</h2>
//               <h2>Price : {product.price}</h2>
//               <h2>{product.quantity}</h2>
//               <img
//                 src={`${BACKEND_URL}/api/products/get-photo/${product._id}`}
//                 alt={product.name}
//               />
//             </div>

//             <div>
//               <Button className="p-3 m-3">Add to Cart </Button>
//             </div>
//           </>
//         ) : (
//           <p>Product not available</p>
//         )}
//       </div>
//     </div>
