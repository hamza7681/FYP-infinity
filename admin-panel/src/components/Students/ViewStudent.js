import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { http } from "../../axios/config";
import { useParams } from "react-router-dom";
import ViewInput from "../../reuseables/ViewInput";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";

const ViewStudent = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [tutor, setTutor] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (token) {
      const getTutor = async () => {
        const res = await http.get("/auth/get-tutor-id/" + id);
        setTutor(res.data);
      };
      getTutor();
    }
  }, [token, id]);
  return (
    <>
      <div className="pt-[50px] h-screen">
        <div className="bg-[#39405a] py-[10px] flex justify-between items-center rounded-[7px] px-[30px]">
          <h1 className="text-white text-[26px]">
            {tutor?.firstName} {tutor?.lastName}
          </h1>
        </div>
        <div className="bg-[#39405a] my-[10px] py-[10px] flex flex-row justify-between rounded-[7px] px-[30px]">
          <div className="flex flex-col py-[30px] border-r-[1px] border-r-white px-[10px]">
            <div className="flex flex-col justify-center items-center">
              <img
                src={tutor?.dp || "http://localhost:5000" + tutor?.dp}
                alt="dp"
                className="w-[150px] rounded-full"
              />
            </div>
            <div className="mt-[30px]">
              <p className="text-white text-[24px] font-semibold">
                {tutor?.firstName} {tutor?.lastName}
              </p>
              <p className="text-gray-400">{tutor?.email}</p>
            </div>
            <div className="mt-[10px] flex flex-col gap-2">
              {tutor?.facebook === "" &&
              tutor?.linkedin === "" &&
              tutor.website === "" ? (
                ""
              ) : (
                <h1 className="text-white underline text-[18px] my-[10px]">
                  Social Contacts
                </h1>
              )}
              {tutor?.facebook === "" ? (
                ""
              ) : (
                <div className="flex flex-row justify-start items-center gap-2">
                  <FaFacebookSquare className="text-[#4267B2] text-[24px]" />
                  <a
                    href={tutor?.facebook}
                    target="_blank"
                    className="text-white text-[13px] underline"
                    rel="noreferrer"
                  >
                    {tutor?.facebook}
                  </a>
                </div>
              )}
              {tutor?.linkedin === "" ? (
                ""
              ) : (
                <div className="flex flex-row justify-start items-center gap-2">
                  <FaLinkedin className="text-[#0077b5] text-[24px]" />
                  <a
                    href={tutor?.linkedin}
                    target="_blank"
                    className="text-white text-[13px] underline"
                    rel="noreferrer"
                  >
                    {tutor?.linkedin}
                  </a>
                </div>
              )}
              {tutor?.website === "" ? (
                ""
              ) : (
                <div className="flex flex-row justify-start items-center gap-2">
                  <BsGlobe2 className="text-[#0077b5] text-[24px]" />
                  <a
                    href={tutor?.website}
                    target="_blank"
                    className="text-white text-[13px] underline"
                    rel="noreferrer"
                  >
                    {tutor?.website}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col px-[10px]">
            {tutor?.role === 0 ? (
              ""
            ) : (
              <ViewInput
                label="Subject"
                value={
                  tutor?.subject === ""
                    ? "<No subject added yet>"
                    : tutor?.subject
                }
              />
            )}
            <ViewInput
              label="Qualification"
              value={
                tutor?.qualification === ""
                  ? "<No Qualification added yet>"
                  : tutor?.qualification
              }
            />
            <div className="flex flex-col w-full py-[10px]">
              <label className="text-white font-semibold py-[3px]">
                Description
              </label>
              <textarea
                className="w-full py-[10px] rounded-[4px] px-[10px] text-white "
                value={
                  tutor?.description === ""
                    ? "<No Description added yet>"
                    : tutor?.description
                }
                disabled
                rows={10}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudent;
