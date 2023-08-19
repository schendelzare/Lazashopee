import React from "react";
import img from "@assets/img/img.png";
import Image from "next/image";

const Header = () => {
  return (
    <div className="m-5 animate-fade-right animate-duration-1000 animate-once relative group ">
      <div className="bg-my-green w-full h-[400px] rounded"></div>
      <div className="absolute inset-0 translate-y-[5%] md:translate-y-[15%]  w-[auto] text-white mx-5 ">
        <h1 className="uppercase font-extrabold text-6xl md:mb-10  animate-fade-right animate-duration-300">
          royal Kludge
        </h1>
        <p className="w-[200px] md:w-[700px]  font-medium tracking-tighter anima animate-fade-right animate-duration-700">
          Royal Kludge keyboards are designed with clearly-defined edges and
          corners for a sleek, streamlined appearance. Combined with
          aerospace-grade metal panels, Royal Kludge keyboards are a perfect fit
          for the most high-tech desktop setups.
        </p>
      </div>
      <Image
        src={img}
        width={300}
        className="hidden lg:flex absolute  right-[10%] bottom-[35%] group-hover:animate-pulse"
        alt="keyboard"
      />
    </div>
  );
};

export default Header;
