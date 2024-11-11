import { Outlet, useChildMatches } from "@tanstack/react-router";
import DashboardSidebar from "./sidebar";
import { some } from "lodash";
import DashboardBody from "./body";

const Dashboard = () => {
  const childMatches = useChildMatches();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashboardSidebar />
      </div>
      {some(childMatches) ? <Outlet /> : <DashboardBody />}
    </div>
  );
};

export default Dashboard;
