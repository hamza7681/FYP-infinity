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
  }, [token, user._id, val.members]);

  return (
    <>
      <div
        key={index}
        className={`relative flex flex-row w-full justify-start items-center gap-2 hover:bg-gray-300 cursor-pointer p-[4px] py-[7px] rounded-[4px] ${
          index === newIndex ? "bg-gray-300" : ""
        }`}
        onClick={() => {
          setSelect({ ...userData, online });
          setShowDiv(true);
          setNewIndex(index);
          setSelectChat(val);
        }}
      >
        <div className="w-[50px] h-[50px] bg-[#03043B] text-white font-semibold flex justify-center items-center rounded-full overflow-hidden">
          {userData && userData.firstName.substring(0, 1)}
          {userData && userData.lastName.substring(0, 1)}
        </div>
        <div className="flex flex-col justify-between ">
          <div className="flex flex-row justify-between items-center ">
            <p className="text-[16px] font-semibold ">
              {userData && userData.firstName} {userData && userData.lastName}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-gray-600">
              This is last message sent...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTab;
