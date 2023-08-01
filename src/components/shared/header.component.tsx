import { ClockCounterClockwise, Gauge } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <header className="w-full h-[10%] max-h-28 flex justify-center md:hidden items-center bg-customPurple text-white px-8 md:py-0 py-4 text-xs">
      <nav className="flex items-center justify-center gap-8 w-full">
        <a
          href="/dashboard"
          className={`flex items-center gap-2 border border-white p-2 rounded-lg ${
            location.pathname == "/dashboard" &&
            "bg-white font-bold text-customPurple"
          }`}
        >
          <Gauge size={24} />
          Dashboard
        </a>

        <a
          href="/history"
          className={`flex items-center gap-2 border border-white p-2 rounded-lg ${
            location.pathname == "/history" &&
            "bg-white font-bold text-customPurple"
          }`}
        >
          <ClockCounterClockwise size={24} />
          Histórico
        </a>
      </nav>
    </header>
  );
}
