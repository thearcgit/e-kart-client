import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import Home from "../../../pages/Home";
import LoginPage from "../../../pages/LoginPage";
import SignupPage from "../../../pages/SignupPage";
import Cart from "../../cart/Cart";
import CartPage from "../../../pages/CartPage";
import Checkout from "../../../pages/Checkout";
import ProductDetail from "../../product/components/ProductDetail";
import ProductDetailPage from "../../../pages/ProductDetailPage";
import Protected from "./Protected";
import PageNotFound from "../../../pages/404";
import OrderSuccess from "../../../pages/OrderSuccess";
import UserOrdersPage from "../../../pages/UserOrdersPage";
import UserProfilePage from "../../../pages/UserProfilePage";
import Signout from "./Signout";
import ForgotPasswordPage from "../../../pages/ForgotPasswordPage";
 export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /> </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element:<Protected><CartPage /> </Protected> ,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /> </Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage /> </Protected>,
  },
  {
    path: "/orders",
    element: <Protected><UserOrdersPage /> </Protected>,
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage /> </Protected>,
  },
  {
    path: `/order-success/:id`,
    element: <Protected><OrderSuccess/></Protected>,
  },
  {
    path: `/Signout`,
    element: <Protected><Signout/></Protected>,
  },
  {
    path: `/forgotPassword`,
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound/>,
  },
]);