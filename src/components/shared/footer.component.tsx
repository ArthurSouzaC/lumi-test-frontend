import {
  ClockCounterClockwise,
  Code,
  Gauge,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="w-full h-[10%] max-h-28 flex justify-center md:justify-between items-center bg-customPurple text-white px-8 md:py-0 py-4 text-xs">
      <nav className="items-center gap-8 hidden md:flex">
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

      <div className="flex gap-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <Code size={24} /> Feito por Arthur Costa
        </div>
        <a
          href="https://www.linkedin.com/in/arthur-costa-6407b01a2"
          target="_blank"
          className="flex items-center"
        >
          <LinkedinLogo size={24} />
        </a>
        <a
          href="https://github.com/ArthurSouzaC"
          target="_blank"
          className="flex items-center"
        >
          <GithubLogo size={24} />
        </a>
      </div>
    </footer>
  );
}
