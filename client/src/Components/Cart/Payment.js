import React from "react";
import GlobalButton from "../../Reuseables/GlobalButton";
import PaymentInput from "../../Reuseables/PaymentInput";
const Payment = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center relative bg-gray-300 md:w-[90%] md:mt-[30px] md:rounded-[5px] md:sticky md:top-[100px] ">
        <div className="w-full px-[30px] py-[30px] gap-2 flex flex-col relative">
          <div className="flex justify-center">
            <h2 className="text-[22px]">Payment Details</h2>
          </div>
          <br />
          <div className="flex flex-col">
            <h3 className="text-[18px] mb-[10px]">Select Card Type</h3>
            <div className="gap-2">
              <input
                type="radio"
                name="Card-type"
                value="visa"
                placeholder="VISA"
                id="visa"
              />
              <label htmlFor="visa" className="ml-[7px] cursor-pointer">
                VISA
              </label>
              <br />
              <input
                type="radio"
                name="Card-type"
                value="Master"
                placeholder="Master"
                id="master"
              />
              <label htmlFor="master" className="ml-[7px] cursor-pointer">
                Master
              </label>
            </div>
            <br />
            <div className="flex flex-col">
              <label>Name on Card</label>
              <PaymentInput type="text" placeholder="Santhosh Sivan" />
              <br />
            </div>
            <div className="flex flex-col">
              <label>Card Number</label>
              <PaymentInput type="number" placeholder="xxxx-xxxx-xxxx-xxxx" />
            </div>
            <br />
            <div className="flex flex-col">
              <label>Expiry Date</label>
              <PaymentInput type="text" placeholder="mm/yyyy" />
            </div>
            <br />
            <div className="gap-3">
              <GlobalButton
                click="Checkout"
                title="Checkout"
                styleClass="bg-[#f5822a] w-full py-[7px] text-white rounded-[3px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
