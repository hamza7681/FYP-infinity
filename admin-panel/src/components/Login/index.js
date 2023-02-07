import React, { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex justify-center items-center">
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
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
