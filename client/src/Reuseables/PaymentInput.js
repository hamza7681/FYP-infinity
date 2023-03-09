import React from "react";

const PaymentInput = ({ type, placeholder, name, change, value, max }) => {
  return (
    <>
      <input
        className="w-full border p-[6px] rounded-md focus:outline-none"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={change}
        value={value}
        maxLength={max}
      />
    </>
  );
};

export default PaymentInput;
