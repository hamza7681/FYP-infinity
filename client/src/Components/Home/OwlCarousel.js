import React from 'react';
import OwlCarouselLib from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import logo from "../../Assets/book.png";


const OwlCarousel = () => {
    return (
        <>
            <div className="owl-theme bg-green" loop margin={10} nav items={1} >
                <div className="item flex justify-center flex-col gap-4 items-center w-full">
                    <h2 className='text-black font-bold'>Our Testimonials</h2>
                    {/* <img src={logo} alt="logo" className="11 mt-3" /> */}
                    {/* <p className="w-[95%] text-center text-[17px] md:w-[700px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s
                    </p>
                    <p className="font-bold">David Anderson</p> */}
                </div>
                <div className="item flex justify-center flex-col gap-4 items-center w-full ">
                    <img src={logo} alt="logo" className="image11 mt-3" />
                    <p className="w-[95%] text-center md:w-[700px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries
                    </p>
                    <p>David Anderson</p>
                </div>
                <div className="item flex justify-center flex-col gap-4 items-center w-full ">
                    <img src={logo} alt="logo" className="image11 mt-3" />
                    <p className="w-[95%] text-center md:w-[700px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries
                    </p>
                    <p>David Anderson</p>
                </div>
            </div>
        </>
    )
}

export default OwlCarousel;
