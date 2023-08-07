import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut, Bubble, Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

interface DoughnutChartProps {
  chartData: any;
  type: string;
  height?: number;
}

const Charts: React.FC<DoughnutChartProps> = ({ chartData, type, height }) => {
  return (
    <div>
      {type === "doughnut" && (
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false, // Hide the labels
              },
            },
          }}
        />
      )}
      {type === "bubble" && (
        <div className="h-[150px] w-full flex justify-center">
          <Bubble
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              scales: {},
              elements: {
                line: {
                  fill: false,
                },
              },
            }}
          />
        </div>
      )}

      {type === "barY" && (
        <div className="h-[150px] w-full flex justify-center">
          <Bar
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  display: false,
                },
                y: {
                  grid: {
                    display: false,
                  },
                },
              },
              indexAxis: "y",
            }}
          />
        </div>
      )}

      {type === "barX" && (
        <div
          className=" w-full flex justify-center"
          style={{ height: height ? height : 200 }}
        >
          <Bar
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              scales: {
                // x: {
                //   display: false,
                // },
                // y: {
                //   grid: {
                //     display: false,
                //   },
                // },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default observer(Charts);
