import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { toast } from "react-toastify";
import SearchInput from "../Search/SearchInput";
import { useCart } from "../../Context/cart";

const Navigation = () => {
  const [cart] = useCart();
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  const logoutHandler = async () => {
    try {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successful");
      navigate("/login");
    } catch (error) {
      console.log("Logged out Error: " + error);
      toast.error("Logout Error");
    }
  };

  return (
    <header className="bg-sky-700 text-white body-font shadow-lg pb-0 mb-0">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center justify-between pb-0 mb-0">
        <Link
          to="/"
          className="flex title-font font-medium items-center mb-4 md:mb-0"
        >
          <span className="ml-3 text-2xl font-bold">Gada Electronics</span>
        </Link>
        <nav className="flex flex-wrap items-center text-base justify-center md:ml-auto md:mr-auto space-x-4">
          <SearchInput />
          <Link to="/" className="hover:text-indigo-300">
            Home
          </Link>
          <Link to="/shop" className="hover:text-indigo-300">
            Shop
          </Link>
          <Link to="/cart" className="hover:text-indigo-300">
            Cart ({cart.length})
          </Link>
          {/*
          <Link to="/favourite" className="hover:text-indigo-300">
            Favourites
          </Link>
           */}
        </nav>
        <div className="flex items-center space-x-4">
          {auth.existingUser && auth.existingUser.isAdmin && (
            <Link to="/dashboard" className="hover:text-indigo-300">
              Dashboard
            </Link>
          )}
          {auth.existingUser ? (
            <>
              <Link to="/profile" className="hover:text-indigo-300">
                {auth.existingUser.username}
              </Link>
              <Button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  SignUp
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;

//  {
//    auth ? (
//      <>
//        <Link to="/profile">
//          <li>{auth.username}</li>
//        </Link>
//        {auth.isAdmin && (
//          <>
//            <li>
//              <Link to="/admin/dashboard">DashBoard</Link>
//            </li>
//            <li>
//              <Link to="/admin/productlist">Product</Link>
//            </li>
//            <li>
//              <Link to="/admin/categorylist">Category</Link>
//            </li>
//            <li>
//              <Link to="/admin/orderlist">Order</Link>
//            </li>
//            <li>
//              <Link to="/admin/userlist">User</Link>
//            </li>
//          </>
//        )}
//        <div>
//          <Link>
//            <Button onClick={logoutHandler} className="m-2">
//              LogOut
//            </Button>
//          </Link>
//        </div>
//      </>
//    ) : (
//      <></>
//    );
//  }

//  {
//    !auth && (
//      <>
//        <Link to="/login">
//          <p className="mr-5 hover:text-gray-900">Login</p>
//        </Link>
//        <Link to="/signup">
//          <p className="mr-5 hover:text-gray-900">SignUp</p>
//        </Link>
//      </>
//    );
//  }
