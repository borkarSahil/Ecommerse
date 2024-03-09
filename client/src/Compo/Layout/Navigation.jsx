import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { toast } from "react-toastify";

const Navigation = () => {
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
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">Gada Electronics</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/">
            <p className="mr-5 hover:text-gray-900">Home</p>
          </Link>

          <Link to="/shop">
            <p className="mr-5 hover:text-gray-900">Shop</p>
          </Link>

          <Link to="/cart">
            <p className="mr-5 hover:text-gray-900">Cart</p>
          </Link>

          <Link to="/favourite">
            <p className="mr-5 hover:text-gray-900">Favourites</p>
          </Link>
        </nav>

        {auth.existingUser && auth.existingUser.isAdmin && (
          <Link to="/dashboard">
            <li>DashBoard</li>
          </Link>
        )}

        {auth.existingUser && (
          <Link to="/profile">
            <li>{auth.existingUser.username}</li>
          </Link>
        )}

        {!auth.existingUser ? (
          <>
            <Link to="/login">
              <Button className="mr-5 ">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="mr-5">SignUp</Button>
            </Link>
          </>
        ) : (
          <>
            <div>
              <Link>
                <Button onClick={logoutHandler} className="m-2">
                  LogOut
                </Button>
              </Link>
            </div>
          </>
        )}
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
