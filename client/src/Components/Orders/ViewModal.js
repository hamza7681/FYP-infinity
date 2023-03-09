import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { http } from "../../Axios/config";
import { useSelector } from "react-redux";
import FormattedPrice from "../../Reuseables/FormattedPrice";

const ViewModal = ({ open, handleClose, id }) => {
  const [product, setProduct] = useState([]);
  const { token } = useSelector((s) => s.AuthReducer);

  useEffect(() => {
    if (id) {
      const getOrder = async () => {
        try {
          const res = await http.get(`order/get-order-id/${id}`, {
            headers: {
              Authorization: token,
            },
          });
          setProduct(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getOrder();
    }
  }, [id]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "7px",
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className="text-[20px] mb-[20px]">Courses</p>
        <div className="flex flex-col gap-5 h-auto">
          {product.product &&
            product.product.map((val) => {
              return (
                <>
                  <div className="flex flex-row justify-between items-center border-b-[1px] border-b-gray-300 pb-[10px]" key={val._id}>
                    <img src={val.image} alt="pic" className="w-[100px]" />
                    <p className="text-[14px]">{val.title}</p>
                    <p className="text-[14px]">
                      <FormattedPrice price={val.price} />
                    </p>
                  </div>
                </>
              );
            })}
        </div>
      </Box>
    </Modal>
  );
};

export default ViewModal;
