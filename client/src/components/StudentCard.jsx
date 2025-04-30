import React from "react";
import BGPattern from "../UI/BGPattern"

const StudentCard = ({ name, email, websiteURL, imageURL, gender, skills }) => {

  return (
    <div className="relative flex w-[350px] h-[220px] md:w-[400px] md:h-[230px] ring-[6px] ring-purple-600 bg-purple-50  cursor-pointer rounded-xl overflow-hidden hover:scale-[1.05] shadow-2xl shadow-violet-700 hover:shadow-violet-300 transition duration-300 ease-in">
      <div className="absolute -right-[94px] -top-[86px] md:-right-[104px] md:-top-[104px] ">
        <BGPattern />
      </div>
      <div className="w-full flex  justify-between px-4 z-10">
        <div className="flex py-10 pl-2 flex-col space-y-1">
          <h2 className="font-inter font-bold text-violet-800 text-2xl capitalize">{name}</h2>
          <p className="font-inter font-semibold text-violet-900 text-md capitalize">{gender}</p>
          <p className="font-inter font-semibold text-violet-900 text-sm ">{email}</p>
          <p className="font-inter font-semibold text-violet-900 text-sm">{websiteURL}</p>
        </div>
        <div className="mt-6 md:mt-4 w-32 h-32 md:w-40 md:h-40 z-10">
          <img src={imageURL} alt="Student profile Pic" className="rounded-full w-full h-full object-cover" />
        </div>
      </div>
      <div className="absolute flex justify-center space-x-4 md:space-x-8 bottom-1  rounded-md py-1 px-4  mx-2.5  w-[330px] md:w-[380px] h-[40px]">

        {skills.map((skill,index) => (
          
            <button key={index} className=" z-10 text-violet-700 uppercase  bg-violet-100 hover:bg-violet-600 hover:text-gray-100  font-inter font-bold rounded-md text-xs px-2  text-center transition duration-300 ease-in">
              {skill}
            </button>
          
        ))}


      </div>
    </div>
  );
};

export default StudentCard;
