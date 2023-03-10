import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { http } from "../../axios/config";
import { useNavigate, useParams } from "react-router-dom";
import FormattedPrice from "../../reuseables/FormattedPrice";
import { FaEye } from "react-icons/fa";
import master from "../../Assets/master.png";
import visa from "../../Assets/visa.png";

const ViewOrder = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (token) {
      const getOrder = async () => {
        const res = await http.get("/order/get-order-id/" + id, {
          headers: { Authorization: token },
        });
        setOrder(res.data);
      };
      getOrder();
    }
  }, [token, id]);

  const FormatCardNo = ({ number }) => {
    let start = number?.substring(0, 2);
    let end = number?.toString().substring(number?.toString().length - 2);
    return start + "**********" + end;
  };
  return (
    <>
      <div className="pt-[50px] h-screen">
        <div className="bg-[#39405a] py-[15px] flex justify-between items-center rounded-[7px] px-[30px]">
          <h1 className="text-white text-[22px]">Order No. {order._id}</h1>
        </div>
        <div className="bg-[#39405a] my-[10px] py-[10px] flex flex-row justify-between rounded-[7px] px-[30px]">
          <div className="flex flex-col gap-4 w-full ">
            <div className="flex flex-row justify-between items-center w-full border-b-[2px] pb-[10px]">
              <div className="w-1/5 flex justify-center items-center">
                <p className="text-white">Image</p>
              </div>
              <div className="w-1/5 flex justify-center items-center">
                <p className="text-white">Title</p>
              </div>
              <div className="w-1/5 flex justify-center items-center">
                <p className="text-white">Price</p>
              </div>
              <div className="w-1/5 flex justify-center items-center">
                <p className="text-white">Language</p>
              </div>
              <div className="w-1/5 flex justify-center items-center">
                <p className="text-white">View</p>
              </div>
            </div>
            {order.product &&
              order.product.map((val) => {
                return (
                  <>
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="w-1/5 flex justify-center items-center">
                        <img
                          src={val.image}
                          alt="img"
                          className="w-[200px] rounded-[7px]"
                        />
                      </div>
                      <div className="w-1/5 flex justify-center items-center">
                        <p className="text-white">{val.title}</p>
                      </div>
                      <div className="w-1/5 flex justify-center items-center">
                        <p className="text-white">
                          <FormattedPrice price={val.price} />
                        </p>
                      </div>
                      <div className="w-1/5 flex justify-center items-center">
                        <p className="text-white">{val.language}</p>
                      </div>
                      <div className="w-1/5 flex justify-center items-center">
                        <div className="bg-green-500 w-fit flex justify-center items-center p-[7px] rounded-[3px] cursor-pointer">
                          <FaEye
                            className="text-white text-[18px]"
                            onClick={() => navigate("/courses/" + val._id)}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="bg-[#39405a] my-[10px] py-[10px] flex flex-row justify-between rounded-[7px] px-[30px]">
          <div className="w-1/2 flex flex-col gap-6">
            <p className="text-white text-[22px]">Card Type:</p>
            <p className="text-white text-[22px]">Card Number:</p>
            <p className="text-white text-[22px]">Total Courses</p>
            <p className="text-white text-[22px]">Total Price</p>
          </div>
          <div className="w-1/2 flex flex-col items-end gap-4">
            <p>
              {order.card === "master" ? (
                <img src={master} alt="master" className="w-[60px]" />
              ) : (
                <img src={visa} alt="visa" className="w-[70px]" />
              )}
            </p>
            <p className="text-white text-[22px]">
              <FormatCardNo number={order.card_number && order.card_number} />
            </p>
            <p className="text-white text-[22px]">
              {order.product && order.product.length}
            </p>
            <p className="text-red-500 text-[22px]">
              <FormattedPrice price={order.totalPrice} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
