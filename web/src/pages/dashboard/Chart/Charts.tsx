import { useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut, Bubble, Bar } from "react-chartjs-2";
import { get, isEmpty } from "lodash";

Chart.register(CategoryScale);

interface DoughnutChartProps {
  chartData: any;
  type: string;
  height?: number;
}

const Charts: React.FC<DoughnutChartProps> = ({ chartData, type, height }) => {
  const getLabelBubbleChart = useMemo(() => {
    if (type === "bubble" && !isEmpty(chartData)) {
      const data = get(chartData, "datasets", []).filter(
        (item: any) => item.type === "bar"
      );
      return data;
    }
  }, [chartData]);

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
        <div>
          <div className="h-[150px] w-full flex flex-col items-center">
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
          <div className="flex justify-around text-[11px] mt-[1rem]">
            {getLabelBubbleChart.map((item: any, index: number) => (
              <div
                className="flex items-center gap-[10px]"
                key={`bubble-${index}`}
              >
                <div
                  className="w-[14px] h-[14px] rounded-full"
                  style={{ backgroundColor: item.backgroundColor }}
                />
                <div key={`${item.label}-${index}`}>{item.label}</div>
              </div>
            ))}
          </div>
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
