import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { http } from "../../Axios/config";

const UserTab = ({
  val,
  index,
  newIndex,
  setSelect,
  setShowDiv,
  setNewIndex,
  setSelectChat,
  online,
}) => {
  const { user, token } = useSelector((s) => s.AuthReducer);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = val.members.find((id) => id !== user._id);
    const getUser = async () => {
      try {
        const res = await http.get(`/auth/get-user/${userId}`, {
          headers: { Authorization: token },
        });
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <div
        key={index}
        className={`relative flex flex-row w-full hover:bg-gray-300 cursor-pointer p-[4px] py-[7px] rounded-[4px] ${
          index === newIndex ? "bg-gray-300" : ""
        }`}
        onClick={() => {
          setSelect({ ...userData, online });
          setShowDiv(true);
          setNewIndex(index);
          setSelectChat(val);
        }}
      >
        <img
          src={userData && userData.dp}
          alt="dp"
          className="rounded-full w-1/5 mr-[10px] "
        />
        {online && (
          <div className="absolute bg-[#36b404] w-[15px] h-[15px] rounded-full left-[40px]"></div>
        )}
        <div className="flex flex-col w-full ">
          <div className="flex flex-row justify-between items-center ">
            <p className="text-[16px] font-semibold ">
              {userData && userData.firstName} {userData && userData.lastName}
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
};

export default UserTab;
