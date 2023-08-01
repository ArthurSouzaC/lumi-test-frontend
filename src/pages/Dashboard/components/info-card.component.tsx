interface DashboardInfoCardProps {
  icon: React.ReactNode;
  value: string;
  unit: string;
  description: string;
  dark?: boolean;
}

export function DashboardInfoCard({
  icon,
  value,
  unit,
  description,
  dark,
}: DashboardInfoCardProps) {
  return (
    <div
      className={`flex flex-col justify-between items-center ${
        dark
          ? "bg-customPurple text-white"
          : "bg-white border border-customPurple text-customPurple"
      } rounded-lg p-4`}
    >
      {icon}
      <div className="flex gap-4">
        <span className="text-3xl text-center font-bold">
          {value && (
            <>
              {value}
              <span className="text-base font-normal">{unit}</span>
            </>
          )}
        </span>
      </div>
      <span className="text-center">{description}</span>
    </div>
  );
}
