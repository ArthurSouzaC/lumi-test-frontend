interface HistoryInfoCardProps {
  icon: React.ReactNode;
  value: string;
  description: string;
}

export function HistoryInfoCard({
  icon,
  value,
  description,
}: HistoryInfoCardProps) {
  return (
    <div
      className={`flex flex-col justify-between items-center bg-white border border-customPurple text-customPurple rounded-lg p-4`}
    >
      {icon}
      <div className="flex gap-4">
        <span className=" text-center font-bold">{value}</span>
      </div>
      <span className="text-center text-xs">{description}</span>
    </div>
  );
}
