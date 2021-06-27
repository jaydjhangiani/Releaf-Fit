import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import Loader from "./Loader";

export default function Chart({ weekData, item }) {
  return (
    <DashboardDetailsWrapper>
      {!weekData.length > 0 ? (
        <Loader />
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
