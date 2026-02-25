import React from 'react'
import AnalyticDashboard from '../components/AnalyticDashboard'
import SideNavDashBoard from '../components/SideNavDashBoard'
import { useSelector } from "react-redux";

const YtAnalytic = () => {
          const channel = useSelector((state) => state.usersData.channelData);
    
  return (
      <div className="flex gap-1 mt-[0rem]  ">
        <div className="left_Sec w-[17rem] ">
          <SideNavDashBoard  />
        </div>
        <div className="right_sec w-[95%] my-2 mt-[3rem] m-auto  ">
          <AnalyticDashboard channel={channel}   />
        </div>
      </div>
  )
}

export default YtAnalytic