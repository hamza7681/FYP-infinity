import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { http } from "../../Axios/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Settings = ({ user }) => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [visibility, setVisibility] = useState(user?.visibility);
  const [loading, setLoading] = useState(false);

  const update = async () => {
    setLoading(true);
    try {
      const res = await http.patch(
        "/auth/update-profile-status",
        { visibility },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(res.data.msg);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col w-full h-[50vh] p-[30px]">
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            id="privacy1"
            checked={visibility}
            defaultChecked={visibility}
            onChange={(e) => setVisibility(e.target.checked)}
          />
          <label htmlFor="privacy1">
            Do you want to show your profile to others?
          </label>
        </div>
        <button
          onClick={update}
          className="w-fit mt-[20px] bg-[#04043A] text-white px-[25px] py-[10px] rounded-[5px]"
        >
          {loading ? <PulseLoader color="#ffffff" /> : "Save"}
        </button>
      </div>
    </>
  );
};

export default Settings;
