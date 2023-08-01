import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { DoughnutChart } from "./doughnut-chart.component";

const monthsNumbers = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export function DashboardRightCard({ data, month, setMonth }: any) {
  const year = new Date().getFullYear().toString();
  const yearDigits = year.substring(year.length - 2);

  const nextMonth = () => {
    const index = monthsNumbers.indexOf(month);
    if (index + 1 > 11) setMonth("JAN");
    else setMonth(monthsNumbers[index + 1]);
  };

  const prevMonth = () => {
    const index = monthsNumbers.indexOf(month);
    if (index - 1 < 0) setMonth("DEZ");
    else setMonth(monthsNumbers[index - 1]);
  };

  return (
    <div className="col-span-2 row-span-3">
      <div className="flex relative flex-col justify-end items-center bg-white border border-customPurple rounded-lg p-4 text-customPurple h-full">
        <div className="absolute top-0 left-0 flex w-full h-16 items-center justify-center px-4 py-2 text-white bg-customPurple rounded-t-lg">
          <div
            className={`absolute top-0 left-0 flex justify-center items-center p-3 cursor-pointer z-20`}
            onClick={() => prevMonth()}
          >
            <CaretLeft className="w-9 h-9 text-white" />
          </div>
          <span className="text-center text-sm md:text-base">
            {month}/{yearDigits}
          </span>
          <div
            className={`absolute top-0 right-0 flex justify-center items-center p-3 cursor-pointer z-20`}
            onClick={() => nextMonth()}
          >
            <CaretRight className="w-9 h-9 text-white" />
          </div>
        </div>

        <span className="font-bold text-2xl md:text-3xl mt-24 mb-4 md:mt-0 md:my-4">
          {data.price && 'R$ ' + data.price}
        </span>

        <DoughnutChart
          title="Valores debitados"
          data={{
            labels: Object.keys(data.monthsData.debit),
            datasets: [
              {
                label: "Débitos",
                data: Object.values(data.monthsData.debit),
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
              },
            ],
          }}
        />

        <DoughnutChart
          title="Valores creditados"
          data={{
            labels: Object.keys(data.monthsData.credit),
            datasets: [
              {
                label: "Créditos",
                data: Object.values(data.monthsData.credit).map((item: any) =>
                  Math.abs(item)
                ),
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
