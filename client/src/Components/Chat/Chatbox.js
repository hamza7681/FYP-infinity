import React, { useEffect, useRef, useState } from "react";
import { BsCheck2, BsThreeDotsVertical } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { CiPaperplane } from "react-icons/ci";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { http } from "../../Axios/config";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

const Chatbox = ({
  setShowDiv,
  select,
  selectChat,
  setSendMessage,
  recieveMessage,
}) => {
  const [message, setMessage] = useState({
    msg: "",
    media: null,
  });
  const [show, setShow] = useState(false);
  const endMessage = useRef(null);
  const [imgFile, setImgFile] = useState(null);

  const [messages, setMessages] = useState([]);
  const { user, token } = useSelector((s) => s.AuthReducer);

  useEffect(() => {
    endMessage.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage?.chatId === selectChat?._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await http.get(`/chat/get-message/${selectChat._id}`, {
          headers: { Authorization: token },
        });
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [select, selectChat]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setMessage({ msg: "", media: e.target.result });
    };

    reader.readAsDataURL(file);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    let obj;
    if (message.media !== null) {
      obj = {
        text: message.msg,
        senderId: user._id,
        chatId: selectChat._id,
        media: message.media,
      };
    } else {
      obj = {
        text: message.msg,
        senderId: user._id,
        chatId: selectChat._id,
        media: null,
      };
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        text: obj.text,
        chatId: obj.chatId,
        senderId: obj.senderId,
      })
    );
    formData.append("image", imgFile);

    try {
      const res = await http.post("/chat/create-message", formData, {
        headers: { Authorization: token },
      });
      setMessages([...messages, res.data]);
      // setMessages([...messages, obj]);
    } catch (error) {
      console.log(error);
    }

    setMessage({ msg: "", media: null });
    const recieverId = selectChat.members.find((id) => id !== user._id);
    setSendMessage({ ...obj, recieverId });
  };

  const Time = ({ time }) => {
    const date = moment(time).tz("Asia/Karachi").format("h:mm A");
    return date;
  };

  return (
    <div className="relative">
      <div className="relative p-[10px] border-b-[2px] h-[20%] flex flex-row items-center w-full justify-between px-[20px]">
        <div className="md:hidden block items-center">
          <BiArrowBack onClick={() => setShowDiv(false)} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <img className="h-[39px] rounded-full " src={select.dp} alt="pic" />
          <div>
            <div className="flex flex-row gap-1 items-center">
              <p className="font-semibold">{select.firstName}</p>
              <p className="font-semibold">{select.lastName}</p>
            </div>
            {select.online ? (
              <p className="text-[#36b404] font-semibold text-[12px] relative top-[-5px]">
                Online
              </p>
            ) : (
              <p className="text-red-600 font-semibold text-[12px] relative top-[-5px]">Offline</p>
            )}
          </div>
        </div>
        <div>
          <BsThreeDotsVertical
            onClick={() => setShow(!show)}
            className="cursor-pointer"
          />
        </div>
        {show ? (
          <div className="absolute top-[50px] right-[30px] p-[10px] w-[200px] bg-white z-10 border-[1px] rounded-[4px] ">
            <Link
              className="hover:bg-gray-300 block p-[7px] rounded-[3px]"
              to="/profile"
              onClick={() => setShow(true)}
            >
              View Profile
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      {message.media === null ? (
        <div className="p-[10px] border-b-[2px] md:h-[510px] w-full overflow-y-scroll scrollbar-hidden h-[600px]">
          {messages &&
            messages.map((val, index) => {
              return (
                <>
                  <div
                    className={`flex m-[10px] ${
                      val.senderId === user._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {val.media !== null ? (
                      <>
                        <div
                          className={` ${
                            val.senderId === user._id
                              ? "bg-green-300"
                              : "bg-gray-300"
                          } rounded-[3px] flex flex-col border-[2px] relative`}
                        >
                          {val.media && (
                            <img
                              src={val.media}
                              alt="pic"
                              className=" h-[150px] md:h-[200px] rounded-[3px]"
                            />
                          )}
                          <p className="text-gray-700 px-[10px] py-[5px] ">
                            {val.text}
                          </p>
                          <div className="flex flex-row justify-end items-center px-[10px]">
                            <p className="text-gray-600 p-[4px] text-[11px] mr-[3px]">
                              <Time time={val.createdAt} />
                            </p>
                            <BsCheck2 className="text-gray-600 text-[13px] relative -top-[1px] " />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div
                        key={index}
                        className={`  flex-col px-[10px] py-[5px] flex rounded-[3px] w-fit ${
                          val.senderId === user._id
                            ? "bg-green-300"
                            : "bg-gray-300"
                        }`}
                      >
                        <p className="text-gray-700">{val.text}</p>
                        <div className="flex flex-row justify-end items-center">
                          <p className="text-gray-600 text-[11px] mr-[3px]">
                            <Time time={val.createdAt} />
                          </p>
                          <BsCheck2 className="text-gray-600 text-[13px] relative -top-[1px] " />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          <div ref={endMessage} />
        </div>
      ) : (
        <div className="p-[10px] border-b-[2px] md:h-[510px] w-full overflow-y-scroll scrollbar-hidden h-[600px] flex flex-col justify-center items-center">
          <div className="w-[500px] relative">
            <img
              src={message.media}
              alt="pic"
              className="border-[3px] border-gray-600 "
            />
            <div
              className=" cursor-pointer absolute top-[10px] right-[10px] flex items-center justify-center bg-slate-500 p-[4px] text-white rounded-full opacity-80"
              onClick={() => {
                setMessage({ ...message, media: null });
              }}
            >
              <FaTimes />
            </div>
          </div>
        </div>
      )}

      <div className="p-[10px]  h-[20%] w-full flex flex-row justify-between items-center relative">
        <label htmlFor="file">
          <FiPaperclip className="text-[25px] cursor-pointer" />
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder={
            message.media === null
              ? "Type a message here"
              : "Enter Captian here!"
          }
          className="w-[90%] p-[3px] focus:outline-none text-gray-500 border-gray-400 border-[2px] px-[15px] py-[6px] rounded-full"
          value={message.msg}
          onChange={(e) => setMessage({ ...message, msg: e.target.value })}
        />
        <div
          className="flex justify-center items-center bg-gray-500 p-[7px] rounded-full cursor-pointer"
          onClick={sendMessage}
        >
          <CiPaperplane className="text-[25px] text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
