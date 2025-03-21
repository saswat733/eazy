import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import CashFlowOverview from "./components/CashFlowOverview";
import Project from "../profile/components/Project";
import PageMeta from "components/common/PageMeta";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}
       <PageMeta
        title="EazeAccounts - Dashboard"
        description="This is the dashboard of EazeAccounts."  
      />
      <div className="mt-3 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Earnings"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Net Profit"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Pending Invoices"}
          subtitle={"$1,000"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <DailyTraffic />
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-1">
          <PieChartCard />
        </div>

        <CashFlowOverview />

        {/* Complex Table , Task & Calendar */}

        {/* Task chart & Calendar */}
      </div>
      <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2 mt-5">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

          <Project />
      </div>
    </div>
  );
};

export default Dashboard;
