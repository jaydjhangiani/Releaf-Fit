import React, { useEffect, useState } from "react";
import {
  getRequestHeaders,
  getWeeklyData,
} from "../utility/DataRequestManager";
import styled from "styled-components";
import Chart from "./Chart";

export default function Dashboard({ user }) {
  const [data, setData] = useState([]);
  const [item, setItem] = useState("");
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

  // useEffect(() => {
  //   if (!data.length > 0) {
  //     // setDataCalories();
  //     console.log("hi");
  //   }
  // }, [data]);

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

  console.log(data);
  return (
    <div>
      <DashboardWrapper>
        <DashboardDetailsCard>
          <DashboardH2>{user.name}</DashboardH2>
          <DashboardP>Your stats for the past week</DashboardP>
        </DashboardDetailsCard>
        <DashboardH1>
          Stats for {weekData[6]?.Date.toString().split("2021")[0]}
        </DashboardH1>
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
        <Chart weekData={data} item={item} />
      </DashboardWrapper>
    </div>
  );
}

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
  width: 80%;
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
  margin-bottom: 10px;
`;
const DashboardP = styled.p`
  font-size: 1rem;
  text-align: center;
`;

const DashboardH1 = styled.h1`
  font-size: 2rem;
  margin-top: 25px;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
