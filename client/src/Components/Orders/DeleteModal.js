import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import GlobalButton from "../../Reuseables/GlobalButton";
import { http } from "../../Axios/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const DeleteModal = ({ open, handleClose, id, setFetchAgain }) => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [loading, setLoading] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "7px",
  };

  const deleteOrder = async () => {
    setLoading(true);
    try {
      const res = await http.delete(`/order/delete-order/${id}`, {
        headers: { Authorization: token },
      });
      toast.success(res.data.msg);
      setFetchAgain(true);
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <p>Do you want to delete this order from your order list?</p>
          <div className="flex flex-row pt-[15px] gap-3">
            <GlobalButton
              title="Cancel"
              styleClass="bg-green-500 px-[25px] py-[7px] text-white rounded-[5px]"
              click={handleClose}
            />
            <GlobalButton
              title={loading ? <PulseLoader color="#ffffff" /> : "Delete"}
              styleClass="bg-red-500 px-[25px] py-[7px] text-white rounded-[5px]"
              click={deleteOrder}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
