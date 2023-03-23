import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import { http } from "../../Axios/config";
import ProfileWishlist from "./ProfileWishlist";
import MyCourses from "./MyCourses";
function Index() {
  const [pageIndex, setPageIndex] = useState(0);
  const { token } = useSelector((s) => s.AuthReducer);
  const [user, setUser] = useState({});
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await http.get("/auth/get-profile", {
            headers: { Authorization: token },
          });
          setUser(res.data.user);
          setFetchAgain(false);
        } catch (error) {
          console.log(error);
          setFetchAgain(false);
        }
      };
      getUser();
    }
  }, [token, fetchAgain]);

  const pages = [<Profile />, <Settings />, <ProfileWishlist />, <MyCourses />];

  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  let currentPage = pages[pageIndex];

  return (
    <>
      <div className="flex flex-row ml-5 gap-7 shadow-md py-10">
        <p
          className={`border-b-[2px] ${
            pageIndex === 0 ? "border-black" : "border-white"
          } hover:border-b-[2px] font-semibold text-[20px] cursor-pointer`}
          onClick={() => handlePageChange(0)}
        >
          Profile
        </p>
        <p
          className={`border-b-[2px] ${
            pageIndex === 1 ? "border-black" : "border-white"
          } hover:border-b-[2px] font-semibold text-[20px] cursor-pointer`}
          onClick={() => handlePageChange(1)}
        >
          Settings
        </p>
        {user && user?.role === 0 ? (
          <p
            className={`border-b-[2px] ${
              pageIndex === 2 ? "border-black" : "border-white"
            } hover:border-b-[2px] font-semibold text-[20px] cursor-pointer`}
            onClick={() => handlePageChange(2)}
          >
            My Wishlist
          </p>
        ) : (
          <p
            className={`border-b-[2px] ${
              pageIndex === 3 ? "border-black" : "border-white"
            } hover:border-b-[2px] font-semibold text-[20px] cursor-pointer`}
            onClick={() => handlePageChange(3)}
          >
            My Courses
          </p>
        )}
      </div>
      {currentPage}
    </>
  );
}

export default Index;
