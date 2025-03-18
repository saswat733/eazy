import { useEffect, useState } from "react";
import { exportToCSV } from "../utils/helper";

const useExcelExport = ({ api, exportKeys = [], fileName, filter }) => {
  const [isExport, setIsExport] = useState(false);

  const { data } = api(
    { all: true, filter: filter },
    {
      skip: !isExport,
    }
  );

  const handleExportExcel = async () => {
    setIsExport(true);
  };

  // const getNestedValue = (obj, key) => {
  //   return key.split(".").reduce((o, k) => (o ? o[k] : null), obj);
  // };

  const getNestedValue = (obj, key) => {
    const value = key.split(".").reduce((o, k) => (o ? o[k] : null), obj);

    if (Array.isArray(value)) {
      return value
        .map(
          (item) =>
            `${item?.condition_type} ${item?.condition_field} "${item?.condition_text}"`
        )
        .join(", ");
    }

    if (typeof value === "object") {
      if (value?.surname) {
        return `${value.name} ${value.surname}`;
      }

      if (value?.account_code) {
        return `${value.account_code}:${value.name}`;
      }
    }

    return value;
  };

  useEffect(() => {
    if (data && data?.data?.length > 0 && isExport) {
      const exportData = data.data.map((item) => {
        const obj = {};
        exportKeys.forEach((key) => {
          obj[key.title] = getNestedValue(item, key.key);
        });
        return obj;
      });
      setIsExport(false);
      exportToCSV(fileName, exportData);
    }
  }, [data, isExport]);

  return { handleExportExcel };
};
export default useExcelExport;
