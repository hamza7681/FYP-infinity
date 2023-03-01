import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotificationMenu = ({ notifications, click, setShow }) => {
  const navigate = useNavigate();
  const FormatDate = ({ timestamp }) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const day = ("0" + date.getDate()).slice(-2);
    return `${day} ${month} ${year}`;
  };
  return (
    <div className="w-[400px] h-auto bg-[#39405a] rounded-[5px] border-[1px] border-gray-500">
      <div className="p-[10px] border-b-[2px]">
        <h1 className="text-[20px]">Unread Notifications</h1>
      </div>
      <div className="overflow-y-auto h-[450px] scroll_bar">
        {notifications.length === 0 ? (
          <div className="m-[7px] p-[10px]">
            <p>No notifications yet!</p>
          </div>
        ) : (
          <>
            {notifications &&
              notifications.map((val) => {
                return (
                  <>
                    <div
                      className="bg-[#565d73] m-[7px] p-[10px] cursor-pointer"
                      key={val._id}
                      onClick={() => {
                        navigate("/notifications");
                        setShow(false);
                      }}
                    >
                      <p>
                        <strong>{val.title}</strong> by{" "}
                        {val.action_by.firstName} {val.action_by.lastName} on{" "}
                        <FormatDate timestamp={val.createdAt} />
                      </p>
                    </div>
                  </>
                );
              })}
          </>
        )}
      </div>
      <div className="flex flex-row justify-between p-[10px] border-t-[2px]">
        <Link
          to="/notifications"
          className="text-[14px] underline"
          onClick={() => setShow(false)}
        >
          Show all Notifications
        </Link>
        <h1 className="text-[14px] underline cursor-pointer" onClick={click}>
          Marked all as Read
        </h1>
      </div>
    </div>
  );
};

export default NotificationMenu;
