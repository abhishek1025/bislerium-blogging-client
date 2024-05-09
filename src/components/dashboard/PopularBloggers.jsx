import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getRequest } from "../../utils";
import { format } from "date-fns";
import { Input, Option, Select, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";

const PopularBloggers = () => {
  const FILTER_TYPE = {
    ALL_TIME: "All Time",
    MONTHLY: "Monthly",
  };
  const [filterType, setFilterType] = useState(FILTER_TYPE.ALL_TIME);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM"));

  const { data: popularBloggers } = useQuery({
    queryKey: ["Popular Bloggers", FILTER_TYPE, date],
    queryFn: async ({ queryKey }) => {
      const _date = new Date(queryKey[2]);
      const endpoint =
        queryKey[1] === FILTER_TYPE.MONTHLY
          ? "/stats/bloggers/all-time"
          : `/stats/bloggers/monthly?month=${
              _date.getMonth() + 1
            }&year=${_date.getFullYear()}`;
      const res = await getRequest({
        endpoint,
      });
      return res?.data;
    },
  });

  console.log(popularBloggers);

  return (
    <div className=" mt-8 p-4">
      <div className="flex justify-between">
        <Typography variant="h5">{filterType} Popular Blogs</Typography>
        <div className="flex gap-x-5">
          {filterType === FILTER_TYPE.MONTHLY && (
            <Input
              type="month"
              label="Month"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          )}
          <Select
            onChange={(value) => {
              setFilterType(value);
            }}
            value={filterType}
            label="Stat Type"
          >
            {Object.values(FILTER_TYPE).map((_filterType) => (
              <Option key={_filterType} value={_filterType}>
                {_filterType}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        {popularBloggers && (
          <Chart
            type="bar"
            series={[
              {
                name: "Score",
                data: popularBloggers.map((blogger) => blogger.score),
              },
            ]}
            options={{
              xaxis: {
                categories: popularBloggers.map((blogger) => blogger.name),
              },

              yaxis: {
                title: {
                  text: "Score",
                },
              },

              colors: ["#4CAF50"],
            }}
            height={400}
          />
        )}
      </div>
    </div>
  );
};

export default PopularBloggers;
