import React from 'react'
import SideNavDashBoard from '../components/SideNavDashBoard'
import { useSelector } from "react-redux";
import RevenueDashboard from '../components/RevenueDashboard';
const YtRevenue = () => {
              const channel = useSelector((state) => state.usersData.channelData);

  return (
        <div className="flex gap-1 mt-[0rem]  ">
        <div className="left_Sec w-[17rem] ">
          <SideNavDashBoard  />
        </div>
        <div className="right_sec w-[95%] my-2 mt-[3rem] m-auto  ">
          <RevenueDashboard channel={channel}   />
        </div>
      </div>
  )
}

export default YtRevenue