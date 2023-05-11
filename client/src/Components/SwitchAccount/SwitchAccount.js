import React, { useEffect, useState } from 'react'
import BreadCrumbs from "../../Reuseables/BreadCrumbs";
import logo from "../../Assets/changeaccount.jpg";
import img from "../../Assets/imagee.jpg";
import ProfileInput from "../../Reuseables/ProfileInput";
import GlobalButton from "../../Reuseables/GlobalButton";
import PulseLoader from "react-spinners/PulseLoader";

const SwitchAccount = () => {
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchProfile();
        return () => {

        };
    }, []);
    const fetchProfile = async () => {
        try {
          setLoading(true);
          const response = await fetch("/auth/get-profile", {
          });
    
          if (response.ok) {
            const data = await response.json();
            setEmail(data.email);
          } else {
            console.log("Error:", response.status);
          }
        } catch (error) {
          console.log("Error:", error);
        } finally {
          setLoading(false);
        }
      };
    
    

    return (
        <>
            <BreadCrumbs
                parent="Home"
                parentPath="/"
                active="Switch Account"
                image={logo}
                pageName="Switch Account" />
            <div className='w-full mt-4 h-full '>
                <h2 className='font-bold text-black flex text-center justify-center'>Do you want to change your role?</h2>
                <div className='w-auto flex lg:flex-row flex-col mx-20 mt-6'>
                    <div className='lg:w-1/2 w-full'>
                        <img src={img} className='w-full' />
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <h2 className='font-bold text-black flex text-center justify-center lg:mt-14 mt-5'>Login here</h2>
                        <div className='mt-9 flex-flex-col'>
                            <div>
                                <ProfileInput
                                    type="email"
                                    value={email}
                                    disabled={true}
                                /></div>
                            <div className='mt-5'>
                                <ProfileInput
                                    type={show ? "text" : "password"}
                                    placeholder="password"
                                    name="password"
                                /></div>
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-6">
                            <input
                                type="checkbox"
                                checked={show}
                                onChange={() => setShow(!show)}
                            />
                            <p className="text-[14px]">Show Password</p>
                        </div>
                        <GlobalButton
                            title={loading ? <PulseLoader color="#ffffff" /> : "Login"}
                            styleClass="bg-black mt-3 w-full py-[7px] text-white font-semibold rounded-[3px]"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SwitchAccount;
