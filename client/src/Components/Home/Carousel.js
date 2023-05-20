import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import logo from "../../Assets/man.png";
import logo1 from "../../Assets/woman.png";

const Carousel = () => {
  return (
    <div className="pb-[120px]">
      <div className="item flex justify-center flex-col gap-4 items-center w-full py-[80px]">
        <h2 className="text-black font-bold mt-7 mb-5 text-[17px]">
          Our Testimonials
        </h2>
      </div>
      <div className="flex lg:flex-row flex-col mx-10 w-auto">
        <div className="lg:w-1/3 w-full flex items-center justify-centre">
          <h2 className="text-black font-bold mt-5 mb-5 text-[20px] text-center">
            What our student says about us!{" "}
          </h2>
        </div>
        <div className="lg:w-2/3 w-full bg-[#2A2F5B] rounded-lg">
          <OwlCarousel
            className="owl-theme bg-green"
            loop
            margin={10}
            nav
            items={1}
            autoplay
            autoplayTimeout={3000}
          >
            <div className="item flex justify-center flex-col gap-4 items-center w-full ">
              <img src={logo} alt="logo" className="image11 mt-5" />
              <p className="w-[95%] text-center md:w-[700px] text-white">
                These online courses exceeded my expectations. The platform is
                intuitive, <br /> and the instructors are experts in their
                fields
              </p>
              <p className="text-white">David Anderson</p>
            </div>
            <div className="item flex justify-center flex-col gap-4 items-center w-full ">
              <img src={logo1} alt="logo" className="image11 mt-5" />
              <p className="w-[95%] text-center md:w-[700px] text-white">
                "Exceptional online courses with top-notch instructors and
                valuable content. Highly recommended!"
              </p>
              <p className="text-white">Yousra Sheikh</p>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
