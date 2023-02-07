import React, { useState } from "react";
import logo from "../../Assets/I.png";
import GlobalInput from "../../Reuseables/GlobalInput";
import { FaEnvelope } from "react-icons/fa";
import GlobalButton from "../../Reuseables/GlobalButton";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { http } from "../../Axios/config";
import PulseLoader from "react-spinners/PulseLoader";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const forgot = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await http.post("/auth/forgot", { email: email });
      toast.success(res.data.msg);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full flex justify-center h-screen items-center relative overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute md:-bottom-[400px] md:left-[-300px] rotate-45 w-[1400px] left-[-300px] bottom-[-400px] "
        >
          <path
            fill="#69aff5"
            fill-opacity="1"
            d="M0,96L24,106.7C48,117,96,139,144,133.3C192,128,240,96,288,80C336,64,384,64,432,96C480,128,528,192,576,218.7C624,245,672,235,720,208C768,181,816,139,864,112C912,85,960,75,1008,96C1056,117,1104,171,1152,192C1200,213,1248,203,1296,202.7C1344,203,1392,213,1416,218.7L1440,224L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
          ></path>
        </svg>
        <div className=" w-[95%] md:w-[400px] relative overflow-hidden shadow-2xl border-[1px] rounded-[3px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute top-[0px] w-[900px] rotate-[200deg] "
          >
            <path
              fill="#f5822a"
              fill-opacity="1"
              d="M0,96L24,106.7C48,117,96,139,144,133.3C192,128,240,96,288,80C336,64,384,64,432,96C480,128,528,192,576,218.7C624,245,672,235,720,208C768,181,816,139,864,112C912,85,960,75,1008,96C1056,117,1104,171,1152,192C1200,213,1248,203,1296,202.7C1344,203,1392,213,1416,218.7L1440,224L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            ></path>
          </svg>
          <div className="flex justify-center flex-col items-center">
            <img className="w-[200px]" src={logo} alt="logo" />
            <h1 className="text-[24px] font-semibold relative -top-[30px] ">
              Forgot Password
            </h1>
          </div>
          <div className="flex flex-col gap-3 px-[40px] my-[30px]">
            <GlobalInput
              type="email"
              icon={<FaEnvelope />}
              placeholder="johndoe@gmail.com"
              value={email}
              change={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="px-[40px] my-[10px]">
            <GlobalButton
              click={forgot}
              title={loading ? <PulseLoader color="#ffffff" /> : "Send Email"}
              styleClass="bg-[#f5822a] w-full py-[7px] text-white font-semibold rounded-[3px]"
            />
            <p className="text-center my-[20px] text-gray-500">
              Back to{" "}
              <Link to="/login" className="text-[#f5822a] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
