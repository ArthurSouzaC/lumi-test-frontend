import {
  CaretLeft,
  CaretRight,
  Lightning,
  Lightbulb,
  Users,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { DashboardInfoCard } from "./info-card.component";

export function DashboardTopCards({ data }: any) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateSize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (width < 768)
    return (
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        swipeable={true}
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        stopOnHover={true}
        className="select-none md:select-text"
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${
                hasPrev ? "absolute" : "hidden"
              } top-0 bottom-0 left-0 flex justify-center items-center p-3 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <CaretLeft className="w-9 h-9 text-gray-400" />
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={`${
                hasNext ? "absolute" : "hidden"
              } top-0 bottom-0 right-0 flex justify-center items-center p-3 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <CaretRight className="w-9 h-9 text-gray-400" />
            </div>
          );
        }}
      >
        <DashboardInfoCard
          icon={<Lightning size={56} weight="regular" className="text-white" />}
          value={data.monthlyConsumption.consumption}
          unit="kWh"
          description="Consumo mensal"
          dark
        />

        <DashboardInfoCard
          icon={
            <Lightbulb
              size={56}
              weight="regular"
              className="text-customPurple"
            />
          }
          value={data.dailyConsumption.averageConsumptionPerDay}
          unit="kWh/dia"
          description="Consumo diário"
        />

        <DashboardInfoCard
          icon={
            <Users size={56} weight="regular" className="text-customPurple" />
          }
          value={data.usersCount}
          unit="UCs"
          description="UCs contabilizadas"
        />
      </Carousel>
    );

  return (
    <>
      <DashboardInfoCard
        icon={<Lightning size={56} weight="regular" className="text-white" />}
        value={data.monthlyConsumption.consumption}
        unit="kWh"
        description="Consumo mensal"
        dark
      />

      <DashboardInfoCard
        icon={
          <Lightbulb size={56} weight="regular" className="text-customPurple" />
        }
        value={data.dailyConsumption.averageConsumptionPerDay}
        unit="kWh/dia"
        description="Consumo diário"
      />

      <DashboardInfoCard
        icon={
          <Users size={56} weight="regular" className="text-customPurple" />
        }
        value={data.usersCount}
        unit="UCs"
        description="UCs contabilizadas"
      />
    </>
  );
}
