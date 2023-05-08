import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileInput from "../../Reuseables/ProfileInput";
import { FaFacebookF, FaLinkedin, FaCheck, FaTimes } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { http } from "../../Axios/config";
import { TbCameraPlus } from "react-icons/tb";

const Profile = () => {
  const { token } = useSelector((s) => s.AuthReducer);
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

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setGLoading(true);
      const getUser = async () => {
        try {
          const res = await http.get("/auth/get-profile", {
            headers: { Authorization: token },
          });
          setUser(res.data.user);
          setFirstName(res.data.user.firstName);
          setLastName(res.data.user.lastName);
          setEmail(res.data.user.email);
          setQualification(res.data.user.qualification);
          setSubject(res.data.user.subject);
          setDescription(res.data.user.description);
          setFacebook(res.data.user.facebook);
          setLinkedIn(res.data.user.linkedin);
          setWebsite(res.data.user.website);
          setImg(res.data.user.dp);
          setFetchAgain(false);
          setGLoading(false);
        } catch (error) {
          console.log(error);
          setFetchAgain(false);
          setGLoading(false);
        }
      };
      getUser();
    }
  }, [token, fetchAgain]);

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
      setFetchAgain(true);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
      setFetchAgain(false);
    }
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setImg(e.target.result);
      setShowBtn(true);
    };

    reader.readAsDataURL(file);
  };

  const upload = async () => {
    setLoading1(true);
    const formData = new FormData();
    formData.append("dp", imgFile);
    try {
      const res = await http.patch("/auth/update-dp", formData, {
        headers: { Authorization: token },
      });
      toast.success(res.data.msg);
      setLoading1(false);
      setFetchAgain(true);
      setShowBtn(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading1(false);
      setFetchAgain(false);
      setShowBtn(false);
    }
  };
  return (
    <>
      {gLoading ? (
        <>
          <div className="flex justify-center items-center py-[30px]">
            <ClipLoader />
          </div>
        </>
      ) : (
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
                      onMouseEnter={() => setShow(true)}
                    />
                    {showBtn ? (
                      <div className="flex flex-row items-center gap-4 absolute bottom-[-10px] z-10">
                        <div
                          className="bg-white flex justify-center items-center w-[30px] h-[30px] border-[2px] rounded-full cursor-pointer"
                          onClick={upload}
                        >
                          {!loading1 ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <ClipLoader color="#000000" size="14px" />
                          )}
                        </div>
                        <div
                          className="bg-white  flex justify-center items-center w-[30px] h-[30px] border-[2px] rounded-full cursor-pointer"
                          onClick={() => {
                            setShowBtn(false);
                            setImg(user.dp);
                          }}
                        >
                          <FaTimes className="text-red-500" />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className={`absolute top-0 flex flex-col justify-center items-center w-[150px] h-[150px] rounded-full bg-black opacity-70  ${
                        show ? "block " : "hidden"
                      }`}
                      onMouseLeave={() => setShow(false)}
                    >
                      <label htmlFor="upload" className="cursor-pointer">
                        <TbCameraPlus className="text-white text-[24px]" />
                      </label>
                      <input
                        type="file"
                        className="hidden"
                        id="upload"
                        onChange={handleImage}
                      />
                    </div>
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
                  placeholder={facebook === "" ? "Enter your facebook url" : ""}
                />
                <ProfileInput
                  styleClass="w-full md:w-1/2"
                  label="Linkedin"
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
              <button
                onClick={update}
                className="bg-[#04043A] text-white px-[25px] py-[10px] rounded-[5px]"
              >
                {loading ? <PulseLoader color="#ffffff" /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
