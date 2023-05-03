import React, { useEffect, useState } from "react";
import ProfileInput from "../../Reuseables/ProfileInput";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { BsExclamationTriangle, BsGlobe } from "react-icons/bs";
import { http } from "../../Axios/config";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../Reuseables/BreadCrumbs";
import logo from "../../Assets/tutors.jpg";

const ViewTutor = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [qualification, setQualification] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [website, setWebsite] = useState("");
  const [img, setImg] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await http.get(`/auth/get-user/${id}`);
        console.log(res.data);
        setUser(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setQualification(res.data.qualification);
        setSubject(res.data.subject);
        setDescription(res.data.description);
        setFacebook(res.data.facebook);
        setLinkedIn(res.data.linkedin);
        setWebsite(res.data.website);
        setImg(res.data.dp);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id]);

  return (
    <>
      <BreadCrumbs
        parent="Home"
        parentPath="/"
        active={firstName + " " + lastName}
        image={logo}
        pageName={firstName + " " + lastName}
      />
      {user?.visibility ? (
        <>
          <div className="flex md:flex-row flex-col ">
            <div className="w-full md:w-[30%]">
              <div className=" w-full flex justify-center items-center relative">
                <div className="w-[80%] h-[90%] gap-2 flex flex-col relative items-center border-b-[2px] py-[20px] md:border-b-[0px]">
                  <div className="flex justify-center flex-col gap-2 relative items-center">
                    <div className="flex justify-center relative">
                      <img
                        src={img === "" ? user && user.dp : img}
                        alt="Profile Pic"
                        className="rounded-full w-[150px] h-[150px]"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center  mt-6">
                      <p className="text-[26px] font-semibold tracking-wider">
                        {firstName} {lastName}
                      </p>
                      <p className="text-[15px] text-gray-500">{email}</p>
                      <p className="text-[15px]">
                        {user && user.role === 0 ? "Student" : "Tutor"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 mt-[20px]">
                      {user && user.facebook === "" ? (
                        ""
                      ) : (
                        <div className="flex justify-start flex-row items-center gap-2">
                          <FaFacebookF className="text-[#3b5998]" />
                          <a
                            href={user.facebook}
                            className="underline text-[13px]"
                          >
                            {user.facebook}
                          </a>
                        </div>
                      )}
                      {user && user.linkedin === "" ? (
                        ""
                      ) : (
                        <div className="flex justify-start flex-row items-center gap-2">
                          <FaLinkedin className="text-[#0e76a8]" />
                          <a
                            href={user.linkedin}
                            className="underline text-[13px]"
                          >
                            {user.linkedin}
                          </a>
                        </div>
                      )}
                      {user && user.website === "" ? (
                        ""
                      ) : (
                        <div className="flex justify-start flex-row items-center gap-2">
                          <BsGlobe className="text-black" />
                          <a
                            href={user.website}
                            className="underline text-[13px]"
                          >
                            {user.website}
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
                    value={email}
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
                    placeholder={
                      facebook === "" ? "Enter your facebook url" : ""
                    }
                  />
                  <ProfileInput
                    styleClass="w-full md:w-1/2"
                    label="Linkedin"
                    value={linkedin}
                    change={(e) => setLinkedIn(e.target.value)}
                    placeholder={
                      linkedin === "" ? "Enter your linkedin url" : ""
                    }
                  />
                  <ProfileInput
                    styleClass="w-full md:w-1/2"
                    label="Website"
                    value={website}
                    change={(e) => setWebsite(e.target.value)}
                    placeholder={
                      website === "" ? "Enter your linkedin url" : ""
                    }
                  />
                </div>
                {user.role === 2 ? (
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-[400px] flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <BsExclamationTriangle className="text-gray-500 text-[62px]" />
              <p className="text-gray-500 text-center text-[32px]">
                This user has restrict its information
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewTutor;
