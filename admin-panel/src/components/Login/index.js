import React, { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../../axios/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const login = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await http.post("/auth/admin-login", { email, password });
      toast.success(res.data.msg);
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "LOGIN", payload: res.data.token });
      navigate('/dashboard')
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen mt-[-48px] flex justify-center items-center">
      <div className="w-[400px] rounded-[10px] bg-white flex flex-col justify-center items-center py-[30px] px-[20px]">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Enter email here"
          className="focus:outline-none w-full py-[10px] border-[2px] rounded-full px-[10px] my-[10px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          className="focus:outline-none w-full py-[10px] border-[2px] rounded-full px-[10px] my-[10px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-row items-center">
          <input
            type="checkbox"
            id="show"
            className="cursor-pointer"
            checked={show}
            onChange={() => setShow(!show)}
          />
          <label htmlFor="show" className="cursor-pointer ml-[2px] text-[13px]">
            Show Password
          </label>
        </div>
        <button
          onClick={login}
          className="bg-orange-600 w-full py-[10px] text-white font-bold rounded-full my-[10px]"
        >
          {loading ? "loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
