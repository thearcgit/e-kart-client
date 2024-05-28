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
import AdminProtected from "./AdminProtected copy";
import AdminHome from "../../../pages/AdminHome";
import AdminProductDetail from "../../admin/components/AdminProductDetail";
import AdminProductFormPage from "../../../pages/AdminProductFormPage";
import AdminOrdersPage from "../../../pages/AdminOrdersPage";
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
    path: `/admin`,
    element: <AdminProtected><AdminHome /></AdminProtected>,
  },
  {
    path: `/admin/product-detail/:id`,
    element: <AdminProtected><AdminProductDetail /></AdminProtected>,
  },
  {
    path: `/admin/product-form`,
    element: <AdminProtected><AdminProductFormPage /></AdminProtected>,
  },
  {
    path: `/admin/product-form/:id`,
    element: <AdminProtected><AdminProductFormPage /></AdminProtected>,
  },
  {
    path: `/admin/product-form`,
    element: <AdminProtected><AdminProductFormPage /></AdminProtected>,
  },
  {
    path: `/admin/orders`,
    element: <AdminProtected><AdminOrdersPage /></AdminProtected>,
  },
  {
    path: "*",
    element: <PageNotFound/>,
  },
]);