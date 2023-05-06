import React, { useEffect, useRef, useState } from "react";
import User from "./User";
import Chatbox from "./Chatbox";
import { RiMessage2Fill } from "react-icons/ri";
import { http } from "../../Axios/config";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [select, setSelect] = useState(null);
  const [selectChat, setSelectChat] = useState(null);
  const dispatch = useDispatch();
  const { token, user } = useSelector((s) => s.AuthReducer);
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("https://infinity-server.herokuapp.com/");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await http.get(`/chat/get-user-chats/${user._id}`, {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_ALL_USERS", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [token, dispatch, user._id, fetchAgain]);

  const checkStatus = (chat) => {
    const findMembers = chat?.members?.find((id) => id !== user._id);
    const online = onlineUsers?.find((user) => user.userId === findMembers);
    return online ? true : false;
  };

  return (
    <>
      <div className="flex flex-row w-full h-full">
        <div
          className={`md:w-[22%] border-r-[2px] ${
            showDiv ? "hide-user-div" : "w-full"
          }`}
        >
          <User
            showDiv={showDiv}
            setShowDiv={setShowDiv}
            setSelect={setSelect}
            setSelectChat={setSelectChat}
            setFetchAgain={setFetchAgain}
            onlineUsers={onlineUsers}
            checkStatus={checkStatus}
          />
        </div>
        <div
          className={`md:w-[78%] h-full ${
            showDiv ? "w-full" : "hide-user-div"
          } `}
        >
          {select === null ? (
            <div className="h-screen flex justify-center items-center flex-col">
              <RiMessage2Fill className="text-[102px] text-gray-400 " />
              <p className="text-gray-400">
                Sorry! There is no chat at current moment
              </p>
              <p className="text-gray-400">
                Please select any user to start chat
              </p>
            </div>
          ) : (
            <Chatbox
              setShowDiv={setShowDiv}
              select={select}
              selectChat={selectChat}
              socket={socket}
              setSendMessage={setSendMessage}
              recieveMessage={recieveMessage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
