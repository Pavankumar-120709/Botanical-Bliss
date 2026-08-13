import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Components
import About from "./components/About.jsx";
import Contact from "./components/user/Contact.jsx";
import Cart from "./components/cart/Cart.jsx";
import Home from "./components/home/Home.jsx";
import ErrorPage from "./components/common/ErrorPage.jsx";
import ProductDetail from "./components/product/ProductDetail.jsx";
import CheckoutForm from "./components/cart/CheckoutForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./components/user/Profile.jsx";
import Orders from "./components/order/Orders.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import Messages from "./components/admin/Messages.jsx";
import OrderSuccess from "./components/order/OrderSuccess.jsx";
import ProductAdmin from "./components/admin/ProductAdmin.jsx";
import DiscountAdmin from "./components/admin/DiscountAdmin.jsx";
import UserRoleManagement from "./components/admin/UserRoleManagement.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

// Loaders
import {
  productsLoader,
  contactLoader,
  couponLoader,
  profileLoader,
  ordersLoader,
  adminOrdersLoader,
  messagesLoader,
  usersLoader,
  discountsLoader,
} from "./loaders/index.js";

// Actions
import {
  contactAction,
  profileAction,
} from "./actions/index.js";

// Clerk
import { ClerkProvider } from "@clerk/clerk-react";

// Store
import store from "./store/store.js";
import { Provider } from "react-redux";

import { APP_CONFIG } from "./config/index.js";

// Route definitions
const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route
      path="/contact"
      element={<Contact />}
      action={contactAction}
      loader={contactLoader}
    />
    <Route path="/cart" element={<Cart />} loader={couponLoader} />
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        action={profileAction}
        shouldRevalidate={({ actionResult }) => {
          return !actionResult?.success;
        }}
      />
      <Route path="/orders" element={<Orders />} loader={ordersLoader} />
      <Route
        path="/admin/orders"
        element={<AdminOrders />}
        loader={adminOrdersLoader}
      />
      <Route
        path="/admin/messages"
        element={<Messages />}
        loader={messagesLoader}
      />
      <Route
        path="/admin/products"
        element={<ProductAdmin />}
        loader={productsLoader}
      />
      <Route
        path="/admin/discount"
        element={<DiscountAdmin />}
        loader={discountsLoader}
      />
      <Route
        path="/admin/users"
        element={<UserRoleManagement />}
        loader={usersLoader}
      />
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

const getInitialTheme = () => {
  try {
    return localStorage.getItem(APP_CONFIG.THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY || "pk_dummy"}>
        <Provider store={store}>
          <RouterProvider router={appRouter} />
        </Provider>
        <ToastContainer
          position={APP_CONFIG.TOAST.POSITION}
          autoClose={APP_CONFIG.TOAST.AUTO_CLOSE}
          hideProgressBar={APP_CONFIG.TOAST.HIDE_PROGRESS_BAR}
          newestOnTop={false}
          draggable
          pauseOnHover
          theme={getInitialTheme()}
          transition={Bounce}
        />
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);
