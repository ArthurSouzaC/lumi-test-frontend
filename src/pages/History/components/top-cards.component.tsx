import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  House,
  ReadCvLogo,
  Tag,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { HistoryInfoCard } from "./info-card.component";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.service";

function renderCards(data: any) {
  return [
    <HistoryInfoCard
      key="historyinfocard1"
      icon={<House size={56} weight="regular" className="text-customPurple" />}
      value={data.class}
      description="Classe"
    />,

    <HistoryInfoCard
      key="historyinfocard2"
      icon={
        <ReadCvLogo size={56} weight="regular" className="text-customPurple" />
      }
      value={data.subClass}
      description="Subclasse"
    />,

    <HistoryInfoCard
      key="historyinfocard3"
      icon={<Tag size={56} weight="regular" className="text-customPurple" />}
      value={data.modality}
      description="Modalidade tarifária"
    />,

    <div
      key="historyinfocard4"
      className={`flex flex-col justify-between items-center bg-white border border-customPurple text-customPurple rounded-lg p-4`}
    >
      <div className="flex gap-4 items-center text-xs">
        <CalendarBlank
          size={56}
          weight="regular"
          className="text-customPurple"
        />

        <div className="flex flex-col">
          <span>Leitura anterior: {data.consultationData.last}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <span className=" text-center font-bold">
          Próxima leitura: {data.consultationData.next}
        </span>
      </div>
      <span className="text-center text-xs">Datas de leitura</span>
    </div>,
  ];
}

export function HistoryTopCards({ clientId }: any) {
  const { data, isLoading } = useQuery(["history_cards"], () =>
    ApiService.getDataForHistoryCards(clientId)
  );

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateSize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (isLoading || !data) return <></>;

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
        {renderCards(data!.data)}
      </Carousel>
    );

  return renderCards(data!.data);
}
