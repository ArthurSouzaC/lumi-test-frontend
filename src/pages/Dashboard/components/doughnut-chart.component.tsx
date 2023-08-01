import { ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProps {
  title: string;
  data: ChartData<"doughnut", number[], string>;
}

export function DoughnutChart({ title, data }: DoughnutChartProps) {
  return (
    <div className="flex flex-col gap-4 items-center font-bold w-full">
      {data.labels?.[0] && <span className="text-center">{title}</span>}
      <div className="w-4/5 h-[20vh]">
        <Doughnut
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  boxWidth: 16,
                  boxHeight: 16,
                  useBorderRadius: true,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
