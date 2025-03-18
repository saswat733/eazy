import BarChart from "components/charts/BarChart";
import { barChartDataDailyTraffic } from "variables/charts";
import { barChartOptionsDailyTraffic } from "variables/charts";
import { MdArrowDropUp } from "react-icons/md";
import Card from "components/card";
const DailyTraffic = () => {
  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <h2 className="text-lg font-bold text-navy-700 dark:text-white">
            Sales
          </h2>
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            $2,579{" "}
            <span className="text-sm font-medium leading-6 text-gray-600">
              Total Sales
            </span>
          </p>
        </div>
        <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold"> +2.45% </p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full pb-0 pt-10">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </div>
    </Card>
  );
};

export default DailyTraffic;
