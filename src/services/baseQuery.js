import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import { CONSTANTS } from "../utils/staticData";

export const baseQuery = fetchBaseQuery({
  baseUrl:
    "https://api-dev.eazeaccounts.com/api",
  prepareHeaders: async (headers) => {
    const token = localStorage.getItem("ultra-token");
    const company = localStorage.getItem(
      CONSTANTS?.companyNameLocalStorage || "defaultKey"
    );

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (company) {
      headers.set("Organization", company);
    }

    return headers;
  },
});
