import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const DeleteModal = ({
  open,
  handleClose,
  heading,
  btn1,
  deleteClick,
  btn2,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#39405a",
    boxShadow: 24,
    p: 4,
    borderRadius: "7px",
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1 className="text-white">{heading}</h1>
            <div className="flex flex-row gap-4 justify-start my-[10px]">
              <button
                className="bg-green-600 text-white py-[7px] px-[15px] rounded-[5px]"
                onClick={handleClose}
              >
                {btn1}
              </button>
              <button
                className="bg-red-600 text-white py-[7px] px-[15px] rounded-[5px]"
                onClick={deleteClick}
                
              >
                {btn2}
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DeleteModal;
