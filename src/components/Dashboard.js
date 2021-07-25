import React, { useEffect, useState } from "react";
import {
  getRequestHeaders,
  getWeeklyData,
} from "../utility/DataRequestManager";
import styled from "styled-components";
import SleepChart from "./SleepChart";
import Chart from "./Chart";
import axios from "axios";


function msToTime(duration) {
  duration = duration / 1000000; 
  var milliseconds = parseInt((duration%1000)/100)
  , seconds = parseInt((duration/1000)%60)
  , minutes = parseInt((duration/(1000*60))%60)
  , hours = parseInt((duration/(1000*60*60))%24);

 hours = (hours < 10) ? "0" + hours : hours;
 minutes = (minutes < 10) ? "0" + minutes : minutes;
 seconds = (seconds < 10) ? "0" + seconds : seconds;

 return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export default function Dashboard({ user }) {
  const [data, setData] = useState([]);
  const [item, setItem] = useState("");
  const [sleepData, setSleepData] = useState([]);
  const [sleep, setSleep] = useState([])
  console.log(user);
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

  const setDataCalories = () => {
    setData(
      weekData.map((d) => ({
        data: d.Calories,
        date: d.Date,
      }))
    );
    setItem({
      name: "Calories",
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
    });
  };

  const setDataHeartPoints = () => {
    setData(
      weekData.map((d) => ({
        data: d.Heart,
        date: d.Date,
      }))
    );
    setItem({
      name: "Heart Points",
      backgroundColor: ["rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(255, 206, 86, 1)"],
    });
  };

  const setDataMovePoints = () => {
    setData(
      weekData.map((d) => ({
        data: d.Move,
        date: d.Date,
      }))
    );
    setItem({
      name: "Move Minutes",
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
    });
  };

  const setDataSteps = () => {
    setData(
      weekData.map((d) => ({
        data: d.Steps,
        date: d.Date,
      }))
    );
    setItem({
      name: "Steps Travelled",
      backgroundColor: ["rgba(153, 102, 255, 0.2)"],
      borderColor: ["rgba(153, 102, 255, 1)"],
    });
  };

  console.log(user.accessToken)

  useEffect(() => {
    if(user){
      const config = {
        headers:{
            "Authorization":`Bearer ${user.accessToken}`
        }
    }
    
    const body = {
        aggregateBy: [
         {
           dataTypeName: "com.google.sleep.segment"
         },
       ],
       endTimeMillis: 1626584659836,
       startTimeMillis:1626498259836 
      // endTimeMillis: timeRightNow - 86400000,
      // startTimeMillis: timeRightNow - 86400000 - 86400000
    }
      axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",body, config)
          .then(response => {
            setSleepData(response.data.bucket[0].dataset[0].point)
          })
          .catch(err => console.log(err.response.data.error.message))
    }
  },[user])

  console.log(sleepData)

  useEffect(() => {
    if(sleepData.length > 0){
      setSleep(
        sleepData.map((item,index) => ({
          index,
          startTime: item.startTimeNanos,
          endTime: item.endTimeNanos,
          val: item?.value[0].intVal,
          duration: (item.endTimeNanos - item.startTimeNanos )/1000000,
          durationHMS: msToTime(item.endTimeNanos - item.startTimeNanos)
        })
      ))
      }
  },[sleepData])

  console.log(sleep);
  return (
    <div>
      <DashboardWrapper>
        <DashboardDetailsCard>
          <DashboardH1>Welcome to Releaf Fit, demotest!</DashboardH1>
          <DashboardH2>
          Stats for {weekData[6]?.Date.toString().split("2021")[0]}
        </DashboardH2>
        </DashboardDetailsCard>
        
        <DashboardDetailsWrapper>
          <DashboardCard onClick={(e) => setDataCalories()}>
            <DashboardH2>{weekData[6]?.Calories}</DashboardH2>
            <DashboardP>Calories</DashboardP>
          </DashboardCard>
          <DashboardCard onClick={(e) => setDataHeartPoints()}>
            <DashboardH2>{weekData[6]?.Heart}</DashboardH2>
            <DashboardP>Heart Points</DashboardP>
          </DashboardCard>
          <DashboardCard onClick={(e) => setDataMovePoints()}>
            <DashboardH2>{weekData[6]?.Move}</DashboardH2>
            <DashboardP>Move Minutes</DashboardP>
          </DashboardCard>
          <DashboardCard onClick={(e) => setDataSteps()}>
            <DashboardH2>{weekData[6]?.Steps}</DashboardH2>
            <DashboardP>Steps Travelled</DashboardP>
          </DashboardCard>
        </DashboardDetailsWrapper>
        <ChartWrap>
        <Chart weekData={data} item={item} />
        </ChartWrap>
        <div>
        {sleep.length > 0 ? <SleepChart sleep={sleep} /> : <h1>No Data</h1>}
        </div>
      </DashboardWrapper>
    </div>
  );
}

const ChartWrap = styled.div`
  margin-top: 30px;
  background: #fff;
  width: 760px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  border: 1px solid whitesmoke;
`;

const DashboardWrapper = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px;
`;

const DashboardDetailsCard = styled.div`
  background: #fff;
  width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

const DashboardDetailsWrapper = styled.div`
  max-width: 1000px;
  display: flex;
  margin-top: 30px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

const DashboardCard = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

const DashboardH2 = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
`;
const DashboardP = styled.p`
  font-size: 1rem;
  text-align: center;
`;

const DashboardH1 = styled.h1`
  font-size: 1.75rem;
  margin-top: 25px;
  font-weight: 500;
  margin-bottom: 15px;
  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;