import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileInput from "../../Reuseables/ProfileInput";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { http } from "../../Axios/config";

const Profile = () => {
  const { user, token } = useSelector((s) => s.AuthReducer);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [qualification, setQualification] = useState(user?.qualification);
  const [subject, setSubject] = useState(user?.subject);
  const [description, setDescription] = useState(user?.description);
  const [facebook, setFacebook] = useState(user?.facebook);
  const [linkedin, setLinkedIn] = useState(user?.linkedin);
  const [website, setWebsite] = useState(user?.website);
  const [loading, setLoading] = useState(false);

  const update = async () => {
    setLoading(true);
    try {
      const res = await http.patch(
        "/auth/update-profile",
        {
          firstName,
          lastName,
          qualification,
          facebook,
          linkedin,
          website,
          subject,
          description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(res.data.msg);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col ">
        <div className="w-full md:w-[30%]">
          <div className=" w-full flex justify-center items-center relative">
            <div className="w-[80%] h-[90%] gap-2 flex flex-col relative items-center border-b-[2px] py-[20px] md:border-b-[0px]">
              <div className="flex justify-center flex-col gap-2 relative items-center">
                <div className="flex justify-center">
                  <img
                    src={user?.dp}
                    alt="Profile Pic"
                    className="rounded-full w-[130px]"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-[26px] font-semibold tracking-wider">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-[15px] text-gray-500">{user?.email}</p>
                  <p className="text-[15px]">
                    {user?.role === 0 ? "Student" : "Tutor"}
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-[20px]">
                  {user?.facebook === "" ? (
                    ""
                  ) : (
                    <div className="flex justify-start flex-row items-center gap-2">
                      <FaFacebookF className="text-[#3b5998]" />
                      <a
                        href={user?.facebook}
                        className="underline text-[13px]"
                      >
                        {user?.facebook}
                      </a>
                    </div>
                  )}
                  {user?.linkedin === "" ? (
                    ""
                  ) : (
                    <div className="flex justify-start flex-row items-center gap-2">
                      <FaLinkedin className="text-[#0e76a8]" />
                      <a
                        href={user?.linkedin}
                        className="underline text-[13px]"
                      >
                        {user?.linkedin}
                      </a>
                    </div>
                  )}
                  {user?.website === "" ? (
                    ""
                  ) : (
                    <div className="flex justify-start flex-row items-center gap-2">
                      <BsGlobe className="text-black" />
                      <a href={user?.website} className="underline text-[13px]">
                        {user?.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[70%]  md:border-l-[2px] md:pl-[10px]">
          <div className="flex w-full mt-12">
            <div className="w-[70%]">
              <h2 className="font-bold text-[22px] mx-[15px] mt-2">
                Basic Info
              </h2>
            </div>
          </div>
          <div className="border-b-2 mt-1"></div>
          <div className="py-[17px] px-[10px]">
            <div className="flex flex-col md:flex-row gap-2 w-full pb-[10px]">
              <ProfileInput
                styleClass="w-full md:w-1/2"
                label="First Name"
                value={firstName}
                change={(e) => setFirstName(e.target.value)}
              />
              <ProfileInput
                styleClass="w-full md:w-1/2"
                label="Last Name"
                value={lastName}
                change={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full pb-[10px]">
              <ProfileInput
                styleClass="w-full md:w-1/2"
                label="Email"
                value={user?.email}
                disabled={true}
              />
              <ProfileInput
                styleClass="w-full md:w-1/2"
                label="Qualification"
                value={qualification}
                change={(e) => setQualification(e.target.value)}
                placeholder={
                  qualification === "" ? "Enter your qualification" : ""
                }
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full pb-[10px]">
              <ProfileInput
                styleClass="w-full md:w-1/2"
                label="Facebook"
                value={facebook}
                change={(e) => setFacebook(e.target.value)}
                placeholder={facebook === "" ? "Enter your facebook url" : ""}
              />
              <ProfileInput
                styleClass="w-full md:w-1/2"
                label="LinkedIn"
                value={linkedin}
                change={(e) => setLinkedIn(e.target.value)}
                placeholder={linkedin === "" ? "Enter your linkedin url" : ""}
              />
              <ProfileInput
                styleClass="w-full md:w-1/2"
                label="Website"
                value={website}
                change={(e) => setWebsite(e.target.value)}
                placeholder={website === "" ? "Enter your linkedin url" : ""}
              />
            </div>
            {user?.role === 2 ? (
              <div className="flex flex-col md:flex-row gap-2 w-full pb-[10px]">
                <ProfileInput
                  styleClass="w-full"
                  label="Subject"
                  value={subject}
                  change={(e) => setSubject(e.target.value)}
                  placeholder={subject === "" ? "Enter your subject" : ""}
                />
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col md:flex-row gap-2 w-full pb-[10px]">
              <div className="flex flex-col w-full">
                <label className="font-semibold">Description</label>
                <textarea
                  placeholder={
                    description === "" ? "Enter your description" : ""
                  }
                  className="focus:outline-none w-full border-[1px] border-gray-400 py-[7px] px-[20px] rounded-[4px] placeholder:text-[14px] resize-none"
                  rows={7}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button
              onClick={update}
              className="bg-[#04043A] text-white px-[25px] py-[10px] rounded-[5px]"
            >
              {loading ? <PulseLoader color="#ffffff" /> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
