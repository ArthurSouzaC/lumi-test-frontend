import { FilePdf } from "@phosphor-icons/react";
import { Footer } from "../../components/shared/footer.component";
import { Header } from "../../components/shared/header.component";
import { HistoryTopCards } from "./components/top-cards.component";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../services/api.service";
import { Loading } from "../../components/shared/loading.component";

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

const downloadAsPDF = (base64String: string, filename: string) => {
  if (base64String.startsWith("JVB")) {
    base64String = "data:application/pdf;base64," + base64String;
    downloadFileObject(base64String, filename);
  } else if (base64String.startsWith("data:application/pdf;base64")) {
    downloadFileObject(base64String, filename);
  } else {
    alert("Not a valid Base64 PDF string. Please check");
  }
};

const downloadFileObject = (base64String: string, filename: string) => {
  const linkSource = base64String;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = filename;
  downloadLink.click();
};

const downloadPDF = async (month: number, clientId: string) => {
  const output = await ApiService.downloadPDF(month, clientId);

  downloadAsPDF(output.data, `fatura-${clientId}-${month}.pdf`);
};

export function History() {
  const { data, isLoading } = useQuery(
    ["history"],
    ApiService.getDataForHistory
  );

  return (
    <section className="bg-customLightGray md:h-screen">
      <Header />

      {isLoading || !data ? (
        <div className="w-full h-[80%] md:h-[90%] flex items-center justify-center">
          <Loading width={16} height={16} />
        </div>
      ) : (
        <div className="p-4 md:p-8 flex flex-col md:grid grid-cols-4 grid-rows-3 gap-4 md:gap-6 h-screen md:h-[90%]">
          <HistoryTopCards clientId={data?.data[0].clientId} />

          <div className="col-span-4 row-span-2 flex flex-col gap-6">
            <div className="relative overflow-x-auto h-full rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-customPurple text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Número da UC
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nome da UC
                    </th>
                    {monthsNumbers.map((item) => {
                      return (
                        <th scope="col" key={item} className="px-6 py-3">
                          {item}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((item: any) => {
                    return (
                      <tr className="bg-white border-b" key={item.clientId}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.clientId}
                        </th>
                        <td className="px-6 py-4">{item.name}</td>
                        {monthsNumbers.map((month) => {
                          return (
                            <td
                              className="px-6 py-4"
                              key={item.clientId + month}
                            >
                              <FilePdf
                                size={24}
                                className={`${
                                  item.months.includes(month)
                                    ? "text-green-600 cursor-pointer"
                                    : "text-gray-600 cursor-not-allowed"
                                } `}
                                onClick={() =>
                                  item.months.includes(month) &&
                                  downloadPDF(
                                    monthsNumbers.indexOf(month) + 1,
                                    item.clientId
                                  )
                                }
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </section>
  );
}
