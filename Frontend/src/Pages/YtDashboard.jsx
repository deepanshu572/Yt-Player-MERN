import React, { useState } from "react";
import SideNavDashBoard from "../components/SideNavDashBoard";
import DashBoard from "../components/DashBoard";
import { useSelector } from "react-redux";
const YtDashboard = () => {
 const [content, setContent] = useState("dashboard");
 const handleTabContent = (tabName) =>{
   setContent(tabName);
 }
   const channel = useSelector((state) => state.usersData.channelData);


  return (
    <>
      <div className="flex gap-1 mt-[0rem]  ">
        <div className="left_Sec w-[17rem] ">
          <SideNavDashBoard action={handleTabContent} />
        </div>
        <div className="right_sec w-[95%] my-2 mt-[3rem] m-auto  ">
          <DashBoard channel={channel}   />
        </div>
      </div>
    </>
  );
};

export default YtDashboard;
