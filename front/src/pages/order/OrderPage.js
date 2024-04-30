import React from "react";
import OrderComponent from "../../components/order/OrderComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import { FaGift } from "react-icons/fa";

const OrderPage = () => {
  return (
    <div>
      <BasicMenu />
      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-50 shadow-md">
        <FaGift className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">주문하기</p>
      </div>
      <OrderComponent />
    </div>
  );
};

export default OrderPage;
