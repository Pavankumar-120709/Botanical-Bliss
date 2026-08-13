import React, { useState } from "react";
import apiClient from "../../api/apiClient.js";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
  clearCart, selectDiscountedPrice, selectAppliedCoupon,
} from "../../store/cart-slice.js";
import { useNavigate } from "react-router-dom";
import PageTitle from "../home/PageTitle.jsx";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../config/index.js";
import { useUser } from "@clerk/clerk-react";

export default function CheckoutForm() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const discount = useSelector(selectDiscountedPrice);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    try {
      console.log("Creating COD order...");
      await apiClient.post(API_ENDPOINTS.ORDERS, {
        totalPrice: totalPrice,
        discount: discount ? discount : 0,
        discountCode: appliedCoupon ? appliedCoupon.code : null,
        paymentId: "COD",
        paymentStatus: "PENDING",
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      console.log("Order created successfully");
      sessionStorage.setItem("skipRedirectPath", "true");
      dispatch(clearCart());
      navigate("/order-success");
    } catch (orderError) {
      console.error("Failed to create order:", orderError);
      setErrorMessage("Order creation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div
        className={
          isProcessing
            ? "visible flex flex-col justify-center items-center my-[200px]"
            : "hidden"
        }
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-light"></div>
        <p className="mt-4 text-2xl font-normal text-primary dark:text-light">
          Processing Order... Don't refresh the page
        </p>
      </div>

      <div
        className={
          isProcessing
            ? "hidden"
            : "visible bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6"
        }
      >
        <PageTitle title="Cash on Delivery Checkout" />

        <p className="text-center mt-8 text-lg text-gray-600 dark:text-lighter mb-8">
          Amount to be paid on delivery: <strong>${totalPrice.toFixed(2)}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
              {errorMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isProcessing || !!errorMessage}
              className="w-full px-6 py-2 mt-6 text-white dark:text-black text-xl bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Place Order (COD)"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
