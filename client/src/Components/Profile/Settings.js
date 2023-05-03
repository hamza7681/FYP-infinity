import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { http } from "../../Axios/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BsExclamationTriangle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Settings = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await http.get("/auth/get-profile", {
            headers: { Authorization: token },
          });
          setVisibility(res.data.user.visibility);
          setFetchAgain(false);
        } catch (error) {
          console.log(error);
          setFetchAgain(false);
        }
      };
      getUser();
    }
  }, [token, fetchAgain]);

  const update = async () => {
    setLoading(true);
    try {
      const res = await http.post(
        "/auth/update-profile-status",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(res.data.msg);
      setFetchAgain(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setFetchAgain(false);
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
