import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import exercise from "../assets/img/exercise.svg"

export default function Chart({ weekData, item }) {
  return (
    <DashboardDetailsWrapper>
      {!weekData.length > 0 ? (
        <ChartWrapperImg>
          <img src={exercise} alt="EXERCISE" />
          <h3>Your Weekly Analysis will be seen here.</h3>
        </ChartWrapperImg>
      ) : (
        <ChartWrapper>
          {console.log(item)}
          <Bar
            data={{
              labels: weekData.map((d) => d.date.toString().split("2021")[0]),

              datasets: [
                {
                  label: item.name,
                  data: weekData.map((d) => d.data),
                  backgroundColor: item.backgroundColor,
                  borderColor: item.borderColor,
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              legend: {
                position: "bottom",
              },
              title: {
                //   text: "Bar Graph: Predicted Population in 2050",
                display: true,
                fontSize: 25,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        </ChartWrapper>
      )}
    </DashboardDetailsWrapper>
  );
}

const DashboardDetailsWrapper = styled.div`
  max-width: 1000px;
  display: flex;
  margin-top: 30px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
  margin: 30px;
`;

const ChartWrapperImg = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
  > img{
    display: flex;
    width: 50%;
    margin-bottom: 30px;
  }
`;

const ChartWrapper = styled.div`
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
`;

const DashboardH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`;

