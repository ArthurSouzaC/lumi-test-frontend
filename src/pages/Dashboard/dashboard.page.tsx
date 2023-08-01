import { useState } from "react";
import { LineChart } from "./components/line-chart.component";
import { DashboardTopCards } from "./components/top-cards.component";
import { DashboardRightCard } from "./components/right-card.component";
import { Footer } from "../../components/shared/footer.component";
import { Header } from "../../components/shared/header.component";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../services/api.service";
import { Loading } from "../../components/shared/loading.component";

export function Dashboard() {
  const [month, setMonth] = useState("JAN");
  const { data, isLoading } = useQuery(["dashboard", month], () =>
    ApiService.getDataForDashboard(month)
  );

  return (
    <section className="bg-customLightGray md:h-screen overflow-y-auto">
      <Header />

      {isLoading || !data ? (
        <div className="w-full h-[80%] md:h-[90%] flex items-center justify-center">
          <Loading width={16} height={16} />
        </div>
      ) : (
        <div className="p-4 md:p-8 flex flex-col md:grid grid-cols-5 grid-rows-3 gap-4 md:gap-6 h-[80%] md:h-[90%]">
          <DashboardTopCards data={data.data} />

          <DashboardRightCard
            setMonth={(value: string) => setMonth(value)}
            month={month}
            data={data.data}
          />

          <div className="flex items-center justify-center row-span-2 col-span-3 rounded-lg bg-customPurple p-4">
            <LineChart />
          </div>
        </div>
      )}

      <Footer />
    </section>
  );
}
