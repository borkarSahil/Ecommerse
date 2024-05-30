import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/cart";
import { BACKEND_URL } from "../../helper/constants.js";
import { Prices } from "../../helper/Prices.js";
import { Button } from "../../components/ui/button.jsx";


const Shop = () => {
  // For cart
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const getTotalCnt = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/get-products`
      );
      setTotal(data?.total);
      console.log("Total: " + total);
    } catch (error) {
      console.log("getTotalCnt error", error);
      toast.error(error);
    }
  };

  const getAllProducts = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/get-products`
      );
      setLoading(false);

      setProducts(data.data);
    } catch (error) {
      console.log("Fetching products error", error);
      toast.error(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/category/get-category`
      );
      if (!data) {
        toast.error("No Category found");
      } else {
        setCategory(data.data);
      }
    } catch (error) {
      console.log("Categories error", error);
      toast.error(error.message);
    }
  };

  const handleFilter = (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (error) {
      console.log("Filter error", error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
    // getAllProducts();
    getAllCategory();
    getTotalCnt();
  }, [checked, radio]);

  const getFilterProduct = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/products/filter`, {
        checked,
        radio,
      });
      setProducts(data?.products);
      console.log("filter ", products);
    } catch (error) {
      console.log("Get Filter error", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      getFilterProduct();
    }
  }, [checked, radio]);

  return (
    <div className="container mx-auto p-3">
      <div className="flex flex-col md:flex-row">
        {/* Filters Section */}
        <div className="md:w-1/4 p-4 border-r border-gray-300">
          <h1 className="text-xl font-bold mb-4">Filters</h1>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Category</h2>
            {category?.map((c) => (
              <div key={c._id}>
                <Checkbox
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Price</h2>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p.name}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-indigo-500 text-white"
          >
            RESET
          </Button>
        </div>

        {/* Products Section */}
        <div className="md:w-3/4 p-4">
          <h1 className="text-xl font-bold text-center mb-4">Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((p) => (
              <div key={p._id} className="border p-4 rounded shadow">
                <h2 className="text-lg font-bold">{p.name}</h2>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p className="text-lg font-semibold">Price: ${p.price}</p>
                <p className="text-sm text-gray-600">Quantity: {p.quantity}</p>
                <img
                  className="w-full h-48 object-cover my-4"
                  src={`${BACKEND_URL}/api/products/get-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added to cart successfully");
                    }}
                    className="bg-green-500 text-white"
                  >
                    Add to Cart
                  </Button>
                  <Link to={`/product-details/${p._id}`}>
                    <Button className="bg-indigo-500 text-white">
                      More Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
              className="bg-indigo-500 text-white"
            >
              {loading ? "Loading..." : "Load more"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

// <div>
//     Home
//     <div>
//       <h1>Filters</h1>

//       <div className="flex flex-col border-2">
//         <h1>Filters by Category</h1>
//         {category?.map((c) => (
//           <Checkbox
//             key={c._id}
//             onChange={(e) => handleFilter(e.target.checked, c._id)}
//           >
//             {c.name}
//           </Checkbox>
//         ))}
//       </div>

//       <div className="flex flex-col border-2">
//         <h1>Filters by Price</h1>
//         <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//           {Prices?.map((p) => (
//             <div>
//               <Radio value={p.array}>{p.name}</Radio>
//             </div>
//           ))}
//         </Radio.Group>
//       </div>

//       <div>
//         <Button onClick={() => window.location.reload()}>RESET</Button>
//       </div>
//     </div>

//     <hr />
//     <div>
//       {JSON.stringify(radio)}
//       <h1 className="justify-center text-center">Products</h1>

//       <div>
//         {products?.map((p) => (
//           <div className="m-5 border-2">
//             <div>
//               <h2>{p.name}</h2>
//               <h2>{p.description}</h2>
//               <h2>Price : {p.price}</h2>
//               <h2>{p.quantity}</h2>
//               <img
//                 src={`${BACKEND_URL}/api/products/get-photo/${p._id}`}
//                 alt={p.name}
//               />
//             </div>

//             <div>

//             {/* CART */}
//               <Button className="p-3 m-3"  onClick={
//                 () => {
//                   setCart([...cart, p]);
//                   localStorage.setItem('cart', JSON.stringify([...cart, p]))
//                   toast.success("Item added to cart successfully")
//                 }
//               }>Add to Cart </Button>

//               <Link to={`/product-details/${p._id}`}>
//                 <Button>More Details</Button>
//               </Link>
//             </div>

//             <div>
//               <Button
//                 className="p-3 m-3"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading..." : "Load more"}
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
