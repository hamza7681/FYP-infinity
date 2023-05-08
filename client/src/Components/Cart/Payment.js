import React, { useState } from "react";
import GlobalButton from "../../Reuseables/GlobalButton";
import PaymentInput from "../../Reuseables/PaymentInput";
import { http } from "../../Axios/config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const Payment = () => {
  const { totalPrice, cartItems } = useSelector((s) => s.CourseReducer);
  const { user, token } = useSelector((s) => s.AuthReducer);
  const [card, setCard] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCardNumberChange = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    const groups = input.match(/.{1,4}/g) || [];
    const formatted = groups.join("-");
    setCardNo(formatted);
  };

  const handleExpiryDateChange = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    const month = input.substring(0, 2);
    const year = input.substring(2, 6);
    const formatted = `${month}/${year}`;
    setExpiry(formatted);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await http.post(
        "/order/add-order",
        {
          totalPrice,
          ordered_by: user._id,
          product: cartItems,
          card,
          card_number: cardNo,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      await http.post("/notification/add-notification", {
        title: "New order placed!",
        action_by: user._id,
        section: "Orders",
      });
      toast.success(res.data.msg);
      dispatch({ type: "CHECKOUT" });
      setCard("");
      setCardNo("");
      setExpiry("");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
      setLoading(false);
    }
  };

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
                onChange={(e) => setCard(e.target.value)}
              />
              <label htmlFor="visa" className="ml-[7px] cursor-pointer">
                VISA
              </label>
              <br />
              <input
                type="radio"
                name="Card-type"
                value="master"
                placeholder="Master"
                id="master"
                onChange={(e) => setCard(e.target.value)}
              />
              <label htmlFor="master" className="ml-[7px] cursor-pointer">
                Master
              </label>
            </div>
            <br />
            <div className="flex flex-col">
              <label>Card Number</label>
              <PaymentInput
                type="text"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                value={cardNo}
                change={handleCardNumberChange}
                max={19}
              />
            </div>
            <br />
            <div className="flex flex-col">
              <label>Expiry Date</label>
              <PaymentInput
                type="text"
                placeholder="mm/yyyy"
                change={handleExpiryDateChange}
                value={expiry}
                max={7}
              />
            </div>
            <br />
            <div className="gap-3">
              <GlobalButton
                click={handleSubmit}
                title={loading ? <PulseLoader color="#ffffff" /> : "Checkout"}
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
