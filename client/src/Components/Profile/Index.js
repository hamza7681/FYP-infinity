import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import Feedbacks from "./Feedbacks";
import { useSelector } from "react-redux";
import { http } from "../../Axios/config";
import ProfileWishlist from "./ProfileWishlist";
import MyCourses from "./MyCourses";
import BreadCrumbs from "../../Reuseables/BreadCrumbs";
import logo from "../../Assets/profile.jpg";
import GlobalLoader from "../../Reuseables/GlobalLoader";

const Index = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { token } = useSelector((s) => s.AuthReducer);
  const [user, setUser] = useState({});
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      const getUser = async () => {
        try {
          const res = await http.get("/auth/get-profile", {
            headers: { Authorization: token },
          });
          setUser(res.data.user);
          setFetchAgain(false);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setFetchAgain(false);
          setLoading(false);
        }
      };
      getUser();
    }
  }, [token, fetchAgain]);

  const pages = [
    <Profile />,
    <Settings />,
    <ProfileWishlist />,
    <MyCourses />,
    <Feedbacks />,
  ];

  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  let currentPage = pages[pageIndex];

  return (
    <>
      {loading && <GlobalLoader />}
      <BreadCrumbs
        parent="Home"
        parentPath="/"
        active={user.firstName + " " + user.lastName}
        image={logo}
        pageName={user.firstName + " " + user.lastName}
      />
      <div className="flex flex-row gap-4 md:gap-7 shadow-md py-10 w-full overflow-x-scroll">
        <p
          className={`border-b-[2px] ${
            pageIndex === 0 ? "border-black" : "border-white"
          } hover:border-b-[2px] font-semibold text-[14px] md:text-[20px] cursor-pointer`}
          onClick={() => handlePageChange(0)}
        >
          Profile
        </p>
        <p
          className={`border-b-[2px] ${
            pageIndex === 1 ? "border-black" : "border-white"
          } hover:border-b-[2px] font-semibold text-[14px] md:text-[20px] cursor-pointer`}
          onClick={() => handlePageChange(1)}
        >
          Settings
        </p>
        {user && user?.role === 0 ? (
          <>
            <p
              className={`border-b-[2px] ${
                pageIndex === 2 ? "border-black" : "border-white"
              } hover:border-b-[2px] font-semibold text-[14px] md:text-[20px] cursor-pointer`}
              onClick={() => handlePageChange(2)}
            >
              My Wishlist
            </p>
            <p
              className={`border-b-[2px] ${
                pageIndex === 4 ? "border-black" : "border-white"
              } hover:border-b-[2px] font-semibold text-[14px] md:text-[20px] cursor-pointer`}
              onClick={() => handlePageChange(4)}
            >
              Feedbacks
            </p>
          </>
        ) : (
          <p
            className={`border-b-[2px] ${
              pageIndex === 3 ? "border-black" : "border-white"
            } hover:border-b-[2px] font-semibold text-[14px] md:text-[20px] cursor-pointer`}
            onClick={() => handlePageChange(3)}
          >
            My Courses
          </p>
        )}
      </div>
      {currentPage}
    </>
  );
};

export default Index;
