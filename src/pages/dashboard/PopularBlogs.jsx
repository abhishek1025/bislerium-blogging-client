import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import { getRequest } from "../../utils";
import { NoDataComponent, PageTitle } from "../../components";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

const PopularBlogs = () => {
  const FILTER_TYPE = {
    ALL_TIME: "All Time",
    MONTHLY: "Monthly",
  };
  const [filterType, setFilterType] = useState(FILTER_TYPE.ALL_TIME);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM"));

  const { data: popularBlogs } = useQuery({
    queryKey: ["Popular Blogs", FILTER_TYPE, date],
    queryFn: async ({ queryKey }) => {
      const _date = new Date(queryKey[2]);
      const endpoint =
        queryKey[1] === FILTER_TYPE.MONTHLY
          ? "/stats/blogs/all-time"
          : `/stats/blogs/monthly?month=${
              _date.getMonth() + 1
            }&year=${_date.getFullYear()}`;
      const res = await getRequest({
        endpoint,
      });
      return res?.data;
    },
  });

  const TABLE_HEAD = ["SN", "Title", "Created Date", "Score", "Action"];

  const TABLE_ROWS = popularBlogs || [];

  return (
    <div className="flex-1 px-2 md:px-5 py-5 md:p-5 bg-white rounded-lg">
      <div className="flex justify-between">
        <PageTitle title={`${filterType} Popular Blogs`} />
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

      {TABLE_ROWS.length === 0 && (
        <NoDataComponent message="NO ERROR LOGS FOUND" imgWidth="md:w-[50%]" />
      )}
      {TABLE_ROWS.length !== 0 && (
        <>
          <div className="overflow-scroll px-0 mt-8">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={uuid()}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {TABLE_ROWS.map((blog, index) => {
                  const { blogId, title, score, createdOn } = blog;

                  console.log(score);

                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={uuid()}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {title}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {createdOn}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {score ? score : 0}
                        </Typography>
                      </td>

                      {/* Error Stack */}
                      <td className={classes}>
                        <div>
                          <Link to={`/blogs/${blogId}`}>
                            <Button size="sm" color="green">
                              View
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PopularBlogs;
