import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export class ApiService {
  static getDataForDashboard(month: string) {
    return httpClient.get("/dashboard", {
      headers: {
        month,
      },
    });
  }

  static getDataForDashboardChart() {
    return httpClient.get("/dashboard/chart");
  }

  static getDataForHistory() {
    return httpClient.get("/history");
  }

  static getDataForHistoryCards(clientId: string) {
    return httpClient.get("/history/cards", {
      headers: {
        clientId,
      },
    });
  }

  static downloadPDF(month: number, clientId: string) {
    return httpClient.get("/history/download", {
      headers: {
        month,
        clientId,
      },
    });
  }
}
