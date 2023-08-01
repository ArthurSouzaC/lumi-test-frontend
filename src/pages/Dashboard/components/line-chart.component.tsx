import { Line } from "react-chartjs-2";
import colorLib, { Color, RGBA } from "@kurkle/color";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.service";

function transparentize(
  value: string | number[] | Color | RGBA,
  opacity?: number
) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export function LineChart() {
  const { data, isLoading } = useQuery(
    ["dashboard_chart"],
    ApiService.getDataForDashboardChart
  );

  if (isLoading || !data) {
    return (
      <Line
        data={{
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
              label: "Loading...",
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: transparentize("#FFFFFF"),
              fill: true,
              borderWidth: 2,
              pointRadius: 0,
              borderColor: "#FFFFFF",
              cubicInterpolationMode: "monotone",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          color: "#FFFFFF",
          plugins: {
            legend: {
              onClick: () => {},
              position: "bottom",
            },
            filler: {
              propagate: true,
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              border: {
                display: false,
              },
              grid: {
                display: false,
              },
              ticks: {
                color: "#FFFFFF",
              },
            },
            y: {
              border: {
                color: "#FFFFFF",
              },
              grid: {
                color: "#F5F5F5",
              },
              ticks: {
                color: "#FFFFFF",
              },
            },
          },
        }}
      />
    );
  }

  return (
    <Line
      data={{
        labels: data.data.map((item: any) => item.month),
        datasets: [
          {
            label: "Variação de preço",
            data: data.data.map((item: any) => item.price),
            backgroundColor: transparentize("#FFFFFF"),
            fill: true,
            borderWidth: 2,
            pointRadius: 0,
            borderColor: "#FFFFFF",
            cubicInterpolationMode: "monotone",
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        color: "#FFFFFF",
        plugins: {
          legend: {
            onClick: () => {},
            position: "bottom",
          },
          filler: {
            propagate: true,
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              color: "#FFFFFF",
            },
          },
          y: {
            border: {
              color: "#FFFFFF",
            },
            grid: {
              color: "#F5F5F5",
            },
            ticks: {
              color: "#FFFFFF",
            },
          },
        },
      }}
    />
  );
}
