import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import UserTab from "./UserTab";
import { http } from "../../Axios/config";
import { toast } from "react-toastify";

const User = ({
  showDiv,
  setShowDiv,
  setSelect,
  setSelectChat,
  setFetchAgain,
  onlineUsers,
  checkStatus,
}) => {
  const { users } = useSelector((s) => s.ChatReducer);
  const [searchedUser, setSearchedUsers] = useState([]);
  const { token, user } = useSelector((s) => s.AuthReducer);
  const [newIndex, setNewIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const values = e.target.value;
    if (values === "") {
      setShow(false);
    } else {
      setShow(true);
      setLoading(true);
      try {
        const res = await http.get(`/auth/search-user?search=${values}`, {
          headers: { Authorization: token },
        });
        setSearchedUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
        setLoading(false);
      }
    }
  };

  const createChat = async (id) => {
    try {
      const res = await http.post(
        "/chat/create-chat",
        {
          senderId: user._id,
          recieverId: id,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast.success(res.data.msg);
      setShow(false);
      setFetchAgain(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-[12px] border-b-[2px] py-[10px] flex flex-row items-center gap-2">
        <Link to="/">
          <BiArrowBack className="text-[28px]" />
        </Link>
        <h2 className="text-[28px] font-bold">Messages</h2>
      </div>
      <div className="px-[10px] py-[10px] border-b-[2px] ">
        <div className="flex flex-row items-center flex-start gap-2 border-gray-400 border-[2px] px-[10px] py-[6px] rounded-full ">
          <FaSearch />
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none text-gray-500 "
            onChange={handleChange}
          />
        </div>
      </div>
      <div
        className={`md:h-[500px] overflow-y-scroll scrollbar-hidden flex flex-col gap-2 w-full p-[10px] ${
          showDiv ? "" : "h-screen"
        }`}
      >
        {show ? (
          <>
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader color="#000000" />
              </div>
            ) : (
              <>
                {searchedUser &&
                  searchedUser
                    .filter((val) => val._id !== user._id)
                    .map((val, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className={`relative flex flex-row w-full hover:bg-gray-300 cursor-pointer p-[4px] py-[7px] rounded-[4px] ${
                              index === newIndex ? "bg-gray-300" : ""
                            }`}
                            onClick={() => createChat(val._id)}
                          >
                            <img
                              src={val.dp}
                              alt="dp"
                              className="rounded-full w-1/5 mr-[10px] "
                            />

                            <div className="flex flex-col w-full ">
                              <div className="flex flex-row justify-between items-center ">
                                <p className="text-[16px] font-semibold ">
                                  {val.firstName} {val.lastName}
                                </p>
                                <p className="text-xs text-gray-500">12:00</p>
                              </div>
                              <div>
                                <p className="text-[15px] text-gray-600">
                                  This is last message sent...
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
              </>
            )}
          </>
        ) : (
          <>
            {users.length === 0 ? (
              <div className="flex justify-center items-center">
                <ClipLoader color="#000000" />
              </div>
            ) : (
              <>
                {users.map((val, index) => {
                  return (
                    <>
                      <UserTab
                        val={val}
                        index={index}
                        newIndex={newIndex}
                        setSelect={setSelect}
                        setShowDiv={setShowDiv}
                        setNewIndex={setNewIndex}
                        setSelectChat={setSelectChat}
                        online={checkStatus(val)}
                      />
                    </>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default User;
