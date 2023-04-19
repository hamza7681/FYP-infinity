import React from "react";
import WishList from "../Components/Wishlist";
import MainNavbar from "../Components/Navbar/MainNavbar";
import Footer from "../Components/Footer/Footer";

const WishListPage = () => {
  return (
    <>
      <MainNavbar />
      <WishList />
      <Footer />
    </>
  );
};

export default WishListPage;
