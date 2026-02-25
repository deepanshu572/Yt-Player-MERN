import React from "react";
import SideNavDashBoard from "../components/SideNavDashBoard";
import ContentDashBoard from "../components/ContentDashBoard";
import { useSelector } from "react-redux";

const YtContent = () => {
      const channel = useSelector((state) => state.usersData.channelData);

  return (
    <>
      <div className="flex gap-1 mt-[0rem]  ">
        <div className="left_Sec w-[17rem] ">
          <SideNavDashBoard channel={channel}/>
        </div>
        <div className="right_sec w-[95%] my-2 mt-[3rem] m-auto  ">
          <ContentDashBoard />
        </div>
      </div>
    </>
  );
};

export default YtContent;
