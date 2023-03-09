import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { http } from "../../Axios/config";
import FormattedPrice from "../../Reuseables/FormattedPrice";
import master from "../../Assets/master.png";
import visa from "../../Assets/visa.png";
import GlobalButton from "../../Reuseables/GlobalButton";
import DeleteModal from "./DeleteModal";
import ViewModal from "./ViewModal";

const Order = () => {
  const { token, user } = useSelector((s) => s.AuthReducer);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [id, setId] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const res = await http.get(`/order/get-order-userId/${user._id}`, {
        headers: { Authorization: token },
      });
      setOrders(res.data);
      setFetchAgain(false);
      console.log(res.data);
    };
    getOrders();
  }, [token, fetchAgain, user._id]);

  const FormatCardNo = ({ number }) => {
    let start = number.substring(0, 2);
    let end = number.toString().substring(number.toString().length - 2);
    return start + "**********" + end;
  };

  return (
    <>
      {open ? (
        <DeleteModal
          open={open}
          handleClose={handleClose}
          id={id}
          setFetchAgain={setFetchAgain}
        />
      ) : (
        ""
      )}
      {open1 ? (
        <ViewModal open={open1} handleClose={handleClose1} id={id} />
      ) : (
        ""
      )}
      <div className="p-[10px] md:p-[30px] ">
        <div className="pb-[10px] border-b-[2px]">
          <h2 className="text-[26px] font-semibold">My Orders</h2>
        </div>
        <div className="w-full flex flex-col md:flex-row mt-[30px]">
          <div className="w-full md:w-[30%] flex justify-center h-[200px] ">
            <div className="flex flex-col justify-center items-center bg-gray-200 p-[50px] rounded-[5px] shadow-lg">
              <p className="text-[28px] font-semibold text-[#292a77]">
                Total Orders
              </p>
              <p className="text-[28px] font-semibold text-[#292a77]">
                {orders && orders.length}
              </p>
            </div>
          </div>
          <div className="w-full md:w-[70%] px-[10px] py-[20px] md:border-l-gray-400 md:border-l-[1px]">
            <div className="flex flex-col gap-6 w-full">
              {orders && orders.length === 0 ? (
                <>
                  <p>Currently! you have no orders!</p>
                </>
              ) : (
                <>
                  {orders &&
                    orders.map((val, index) => {
                      return (
                        <>
                          <div
                            className={`w-full border-[1px] shadow-xl rounded-[5px] ${
                              index % 2 !== 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            key={val._id}
                          >
                            <div className="p-[10px] border-b-[2px] w-full">
                              <p className="text-[#292a77] font-semibold">
                                Order No. {val._id}
                              </p>
                            </div>
                            <div className="flex flex-col md:flex-row w-full">
                              <div className="w-full md:w-[70%] p-[15px]">
                                <div className="flex flex-row gap-3 py-[5px]">
                                  <div>
                                    <p className="font-semibold">
                                      Total Price:
                                    </p>
                                  </div>
                                  <div>
                                    <FormattedPrice price={val.totalPrice} />
                                  </div>
                                </div>
                                <div className="flex flex-row gap-3 py-[5px] justify-start items-center">
                                  <div>
                                    <p className="font-semibold">Card:</p>
                                  </div>
                                  <div>
                                    {val.card === "master" ? (
                                      <img
                                        src={master}
                                        alt="master"
                                        className="w-[70px]"
                                      />
                                    ) : (
                                      <img
                                        src={visa}
                                        alt="visa"
                                        className="w-[70px]"
                                      />
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-row gap-3 py-[5px]">
                                  <div>
                                    <p className="font-semibold">
                                      Card Number:
                                    </p>
                                  </div>
                                  <div>
                                    <p>
                                      <FormatCardNo number={val.card_number} />
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row gap-3 py-[5px]">
                                  <div>
                                    <p className="font-semibold">
                                      Total Courses:
                                    </p>
                                  </div>
                                  <div>
                                    <p>{val.product.length}</p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full gap-4 pt-[30px] flex-wrap">
                                  {val.product.map((item) => {
                                    return (
                                      <>
                                        <div className="flex flex-col gap-2 items-center w-[120px]">
                                          <img
                                            src={item.image}
                                            alt="course_pic"
                                            className="w-[150px] h-[100px] rounded-[3px]"
                                          />
                                          <p className="text-[14px] font-semibold">
                                            {item.title}
                                          </p>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="md:w-[30%] w-full h-auto flex justify-center items-center md:py-0 py-[10px] px-[10px]">
                                <div className="flex flex-col gap-3 w-full">
                                  <GlobalButton
                                    title="View Order"
                                    styleClass="text-white bg-green-500 py-[10px] w-full rounded-[5px]"
                                    click={() => {
                                      handleOpen1();
                                      setId(val._id);
                                    }}
                                  />
                                  <GlobalButton
                                    title="Delete Order"
                                    styleClass="text-white bg-red-500 py-[10px] w-full rounded-[5px]"
                                    click={() => {
                                      handleOpen();
                                      setId(val._id);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
