import React from "react";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../helper/constants";
import { Button } from "../components/ui/button";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total;
    } catch (error) {
      console.log("TotalPrice Cart item failed", error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log("Removing Cart item failed", error);
    }
  };
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <div>{`Hello ${auth?.token && auth?.existingUser?.username}`}</div>
      <h3 className="text-xl mb-4">
        {cart?.length > 0 ? `Items in Cart: ${cart.length}` : "Cart is Empty"}
      </h3>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-2/3 pr-4">
          <h3 className="text-lg font-semibold mb-4">Cart Items</h3>
          {cart?.map((product) => (
            <div
              key={product._id}
              className="flex flex-col md:flex-row items-center border-b pb-4 mb-4"
            >
              <img
                className="w-24 h-24 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                src={`${BACKEND_URL}/api/products/get-photo/${product._id}`}
                alt={product.name}
              />
              <div className="flex-grow text-left">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-900 font-bold mb-2">
                  Quantity: {product.quantity}
                </p>
                <p className="text-gray-900 font-bold mb-2">
                  Price: ${product.price}
                </p>
              </div>
              <Button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={() => removeCartItem(product._id)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="bg-yellow-300 p-4 text-center rounded-lg mt-4">
            <h2 className="text-xl font-bold">Total Price: ${totalPrice()}</h2>
          </div>
        </div>

        <div className="w-full md:w-1/3 pl-4 mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Checkout | Payment</h3>
          <Button
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
