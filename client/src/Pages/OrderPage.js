import React from "react";
import Order from "../Components/Orders";
import Footer from "../Components/Footer/Footer";
import MainNavbar from "../Components/Navbar/MainNavbar";

const OrderPage = () => {
  return (
    <>
      <MainNavbar />
      <Order />
      <Footer />
    </>
  );
};

export default OrderPage;
