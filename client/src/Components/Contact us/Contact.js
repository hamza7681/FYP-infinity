import React, { useState } from "react";
import { FiHeadphones } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import GlobalButton from "../../Reuseables/GlobalButton";
import BreadCrumbs from "../../Reuseables/BreadCrumbs";
import logo from "../../Assets/contact.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { http } from "../../Axios/config";
import PulseLoader from "react-spinners/PulseLoader";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submitQuestion = async () => {
    setLoading(true);
    try {
      const res = await http.post("/contact/add-contact", {
        name,
        email,
        text,
      });
      toast.success(res.data.msg);
      setName("");
      setText("");
      setEmail("");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <BreadCrumbs
          parent="Home"
          parentPath="/"
          active="Contact Us"
          image={logo}
          pageName="Contact us"
        />
        <div className="flex lg:flex-row flex-col  w-auto px-[10px] md:px-20 mt-7">
          <div className="lg:w-1/2 md:w-1/2 w-full">
            <h2 className="text-blue font-bold mt-7 text-[30px] text-left">
              Contact info
            </h2>
            <div className="flex flex-col gap-6">
              <div className="mt-7 flex flex-row items-center gap-4">
                <FiHeadphones className="p-3 rounded-full text-white bg-[#03043B] w-14 h-14" />
                <div className="flex flex-col">
                  <h2 className="font-bold block text-[20px] ">Phone</h2>
                  <div>+92 311 7110211</div>
                </div>
              </div>
              <div className="mt-7 flex flex-row items-center gap-4">
                <AiOutlineMail className="p-3 rounded-full text-white bg-[#03043B] w-14 h-14" />
                <div className="flex flex-col">
                  <h2 className="font-bold block text-[20px] ">Email</h2>
                  <div>infinity.institude010@gmail.com</div>
                </div>
              </div>
              <div className="mt-7 flex flex-row items-center gap-4">
                <FaMapMarkerAlt className="p-5 rounded-full text-white bg-[#03043B] w-14 h-14" />
                <div className="flex flex-col">
                  <h2 className="font-bold block text-[20px] ">Location</h2>
                  <div>University of Agriculture, Faisalabad, Pakistan</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 md:w-1/2 w-full">
            <h2 className="text-blue font-bold mt-7 text-[30px] text-left">
              Do you have any Questions?
            </h2>
            <div className="flex flex-col w-full mt-5">
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  className="border border-solid border-black p-4  w-full"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className=" w-full p-4 border-black border-solid border"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <textarea
                  className="border border-solid border-black w-full p-4"
                  rows="6"
                  placeholder="Your message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
            </div>
            <GlobalButton
              title={loading ? <PulseLoader color="#ffffff" /> : "Submit"}
              click={submitQuestion}
              styleClass="bg-white border-[2px] cursor-pointer hover:bg-[#03043b] hover:text-white border-black py-[10px] px-[30px] font-semibold mt-7"
            />
          </div>
        </div>
        <div className="mt-10 mb-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.5048558810436!2d73.07093244945777!3d31.42776548555192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922421d9937f131%3A0x129b74d67c73a16d!2sUniversity%20of%20Agriculture%20-%20UAF!5e0!3m2!1sen!2s!4v1682018614582!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            title="address"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
