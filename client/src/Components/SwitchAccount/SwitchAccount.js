import React, { useState } from "react";
import BreadCrumbs from "../../Reuseables/BreadCrumbs";
import logo from "../../Assets/changeaccount.jpg";
import img from "../../Assets/imagee.jpg";
import ProfileInput from "../../Reuseables/ProfileInput";
import GlobalButton from "../../Reuseables/GlobalButton";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../Axios/config";
import { toast } from "react-toastify";

const SwitchAccount = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();

  const switching = async () => {
    setLoading(true);
    try {
      const res = await http.post("/auth/login", {
        email: user.email,
        password: password,
      });
      if (res.status === 200) {
        try {
          const response = await http.patch(
            "/auth/update-role",
            {},
            { headers: { Authorization: token } }
          );
          toast.success(response.data.msg);
          dispatch({ type: "LOGOUT" });
          localStorage.clear();
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <BreadCrumbs
        parent="Home"
        parentPath="/"
        active="Switch Account"
        image={logo}
        pageName="Switch Account"
      />
      <div className="w-full mt-4 h-full ">
        <h2 className="font-bold text-black flex text-center justify-center">
          Do you want to change your role?
        </h2>
        <div className="w-auto flex lg:flex-row flex-col mx-20 mt-6">
          <div className="lg:w-1/2 w-full">
            <img src={img} className="w-full" alt="img" />
          </div>
          <div className="lg:w-1/2 w-full">
            <h2 className="font-bold text-black flex text-center justify-center lg:mt-14 mt-5">
              Switch Account
            </h2>
            <div className="mt-9 flex-flex-col">
              <div>
                <ProfileInput type="email" value={user.email} disabled={true} />
              </div>
              <div className="mt-5">
                <ProfileInput
                  type={show ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  change={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={show}
                onChange={() => setShow(!show)}
              />
              <p className="text-[14px]">Show Password</p>
            </div>
            <GlobalButton
              title={loading ? <PulseLoader color="#ffffff" /> : "Switch"}
              styleClass="bg-black mt-3 w-full py-[7px] text-white font-semibold rounded-[3px]"
              click={switching}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SwitchAccount;
