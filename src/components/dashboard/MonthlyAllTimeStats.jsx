import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { getRequest } from "../../utils";
import { Typography } from "@mui/material";
import { Input } from "@material-tailwind/react";
import { format } from "date-fns";

const MonthlyAllTimeStats = () => {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM"));

  const { data: monthlyAllTimeStats } = useQuery({
    queryKey: ["Monthly All Time Stats", date],
    queryFn: async ({ queryKey }) => {
      const _date = new Date(queryKey[1]);
      const res = await getRequest({
        endpoint: `/stats/monthly?month=${
          _date.getMonth() + 1
        }&year=${_date.getFullYear()}`,
      });
      return res?.data;
    },
  });
  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h6">Monthly All Time Stats</Typography>
        <div>
          <Input
            type="month"
            label="Month"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
      </div>
      {monthlyAllTimeStats && (
        <Chart
          type="pie"
          series={[...Object.values(monthlyAllTimeStats)]}
          options={{
            labels: [
              "Total Blogs",
              "Total Upvotes",
              "Total Downvotes",
              "Total Comments",
            ],
            legend: {
              show: true,
              position: "bottom",
            },
          }}
          height={300}
        />
      )}
    </div>
  );
};

export default MonthlyAllTimeStats;
