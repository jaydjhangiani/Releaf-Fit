import React, { useState } from "react";
import {
  getRequestHeaders,
  getWeeklyData,
} from "../utility/DataRequestManager";
export default function Dashboard({ user }) {
  // fetch weekly data
  const accessToken = user.accessToken;
  const [weekData, setWeekData] = useState([]);
  // let weekData = [];

  let selected = [0, 1, 2, 3, 4, 5, 6];
  const callBack = (state) => {
    setWeekData(state);
  };
  const requestHeaders = getRequestHeaders(accessToken);
  const timeRightNow = new Date().getTime();
  getWeeklyData(timeRightNow, requestHeaders, callBack, weekData);

  console.log(weekData);
  return <div></div>;
}
