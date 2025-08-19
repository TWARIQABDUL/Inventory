import { createContext, useState } from "react";

export const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  let pastDate = new Date();
  const [filterd, setFilters] = useState()
  const [dynData, setDynData] = useState([
    { name: 'Page ', uv: 400, pv: 2400, amt: 2700,date: "2025-08-10" },
    { name: 'Page B', uv: 300, pv: 2000, amt: 2210,date: "2025-08-07" },
    { name: 'Page C', uv: 800, pv: 9800, amt: 2290,date: "2025-08-08" },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000,date: "2025-08-05" },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000,date: "2025-08-13" },

  ]
  )

  const refrech=()=>{
    setFilters(dynData)
  }
  const formatDate = (range) => {
    const today = new Date();
setFilters(dynData)
    switch (range) {
      case "LAST_7_DAYS":
        // Subtract 6 days so that today is included
        pastDate.setDate(today.getDate() - 6);

        return {
          startDate: pastDate.toISOString().split("T")[0],
          endDate: today.toISOString().split("T")[0]
        };
        case "LAST_30_DAYS":
          // Subtract 6 days so that today is included
          pastDate = new Date();
          pastDate.setDate(today.getDate() - 29);

          return {
            startDate: pastDate.toISOString().split("T")[0],
            endDate: today.toISOString().split("T")[0]
          };
          case "LAST_90_DAYS":
          // Subtract 6 days so that today is included
          pastDate = new Date();
          pastDate.setDate(today.getDate() - 89);

          return {
            startDate: pastDate.toISOString().split("T")[0],
            endDate: today.toISOString().split("T")[0]
          };
      default:
        setFilters(dynData);

        throw new Error("Unknown range type");
    }
  };

 const Sortdata = (sortKey) => {
    const { startDate, endDate } = formatDate(sortKey);

    // Filter by date range
    const filteredData = dynData.filter(item => {
      return item.date >= startDate && item.date <= endDate;
    });

    // Sort filtered data by amount
    const sorted = [...filteredData].sort((a, b) => a.amt - b.amt);

    setFilters(sorted);
  };
  return (
    <AnalyticsContext.Provider value={{ dynData, Sortdata, filterd,refrech }}>
      {children}
    </AnalyticsContext.Provider>
  );
}