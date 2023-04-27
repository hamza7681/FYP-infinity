import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { http } from "../../axios/config";
import { useParams } from "react-router-dom";
import ViewInput from "../../reuseables/ViewInput";

const ViewContact = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [contact, setContact] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (token) {
      const getContact = async () => {
        const res = await http.get("/contact/get-contact/" + id);
        setContact(res.data);
      };
      getContact();
    }
  }, [token, id]);

  return (
    <div className="pt-[50px] h-auto">
      <div className="bg-[#39405a] py-[10px] flex justify-between items-center rounded-[7px] px-[30px]">
        <h1 className="text-white text-[26px]">{contact?.name}</h1>
      </div>
      <div className="bg-[#39405a] my-[10px] py-[10px] flex flex-col rounded-[7px] px-[30px]">
        <ViewInput label="Send by" value={contact?.name} />
        <div className="flex flex-col w-full py-[10px]">
          <label className="text-white font-semibold py-[3px]">
            Contact Text
          </label>
          <textarea
            className="w-full py-[10px] rounded-[4px] px-[10px] text-white resize-none"
            value={contact?.text}
            disabled
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
