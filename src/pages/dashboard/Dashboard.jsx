import React from "react";
import {
  AllTimeStats,
  MonthlyAllTimeStats,
  PopularBloggers,
} from "../../components";

const Dashboard = () => {
  return (
    <div className="flex-1 px-2 md:px-5 py-5 md:p-5 bg-white rounded-lg">
      <div className="flex justify-between gap-x-8">
        <div className="w-[50%]">
          <AllTimeStats />
        </div>
        <div className="flex-1 border p-3">
          <MonthlyAllTimeStats />
        </div>
      </div>

      <PopularBloggers />
    </div>
  );
};

export default Dashboard;
