import { createContext, useEffect, useState } from "react";

export const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [apiData, setApiData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Demo data (used if API has no date/amt fields yet)
  const dynData = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2700, date: "2025-08-10" },
    { name: "Page B", uv: 300, pv: 2000, amt: 2210, date: "2025-08-07" },
    { name: "Page C", uv: 800, pv: 9800, amt: 2290, date: "2025-08-08" },
    { name: "Page D", uv: 278, pv: 3908, amt: 2000, date: "2025-08-05" },
    { name: "Page E", uv: 500, pv: 4200, amt: 3100, date: "2025-08-13" },
  ];

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/products`);
      const data = await response.json();

      // 🔑 Ensure products have comparable fields (mock transform for now)
      // const transformed = data.map((p, idx) => ({
      //   name: p.productName,
      //   uv: p.inStock,
      //   pv: p.productCost,
      //   amt: p.inStock * p.productCost,
      //   date: new Date().toISOString().split("T")[0],
      //   id: p.productId || idx,
      // }));

      setApiData(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFiltered(dynData); // fallback
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Refresh manually
  const refresh = () => {
    fetchData();
  };

  // Date range formatter
  const formatDate = (range) => {
    const today = new Date();
    let pastDate = new Date();

    switch (range) {
      case "LAST_7_DAYS":
        pastDate.setDate(today.getDate() - 6);
        break;
      case "LAST_30_DAYS":
        pastDate.setDate(today.getDate() - 29);
        break;
      case "LAST_90_DAYS":
        pastDate.setDate(today.getDate() - 89);
        break;
      default:
        return null;
    }

    return {
      startDate: pastDate.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    };
  };

  // Filter & sort data
  const sortData = (rangeKey) => {
    const range = formatDate(rangeKey);
    if (!range) {
      setFiltered(apiData.length ? apiData : dynData);
      return;
    }

    const { startDate, endDate } = range;

    const dataset = apiData.length ? apiData : dynData;

    const filteredData = dataset.filter(
      (item) => item.date >= startDate && item.date <= endDate
    );

    const sorted = [...filteredData].sort((a, b) => a.amt - b.amt);
    setFiltered(sorted);
  };

  return (
    <AnalyticsContext.Provider
      value={{
        dynData,
        apiData,
        filtered,
        sortData,
        refresh,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
