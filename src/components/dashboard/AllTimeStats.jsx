import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { getRequest } from "../../utils";
import { PageTitle } from "../ui";

const AllTimeStats = () => {
  const { data: allTimeStats } = useQuery({
    queryKey: ["allTimeStats"],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: "/stats/all-time",
      });

      console.log(res?.data);
      
      return res?.data;
    },
  });

  return (
    <div>
      <PageTitle title='Dashboard' />
      <div className='grid grid-cols-2 gap-x-8 gap-y-5 mt-8'>
        <div className='bg-white px-8 py-5 flex items-center gap-x-4 rounded shadow-sm border'>
          <div className='h-[50px] w-[50px] flex items-center justify-center bg-blue-50 rounded-full'>
            <MdOutlineArticle size='30px' className='text-blue-600' />
          </div>
          <div>
            <p className='text-xl font-bold'>{allTimeStats?.totalBlogs}</p>
            <p className='text-sm text-gray-600'>Total Blogs</p>
          </div>
        </div>

        <div className='bg-white px-8 py-5 flex items-center gap-x-4 rounded shadow-sm border'>
          <div className='h-[50px] w-[50px] flex items-center justify-center bg-deep-orange-50 rounded-full'>
            <FaRegComments size='30px' className='text-deep-orange-600' />
          </div>
          <div>
            <p className='text-xl font-bold'>
              <p className='text-xl font-bold'>{allTimeStats?.totalComments}</p>
            </p>
            <p className='text-sm text-gray-600'>Total Comments</p>
          </div>
        </div>

        <div className='bg-white px-8 py-5 flex items-center gap-x-4 rounded shadow-sm border'>
          <div className='h-[50px] w-[50px] flex items-center justify-center bg-green-50 rounded-full'>
            <BiUpvote size='30px' className='text-green-600' />
          </div>
          <div>
            <p className='text-xl font-bold'>{allTimeStats?.totalUpvotes}</p>
            <p className='text-sm text-gray-600'>Total Upvotes</p>
          </div>
        </div>

        <div className='bg-white px-8 py-5 flex items-center gap-x-4 rounded shadow-sm border'>
          <div className='h-[50px] w-[50px] flex items-center justify-center bg-purple-50 rounded-full'>
            <BiDownvote size='30px' className='text-purple-600' />
          </div>
          <div>
            <p className='text-xl font-bold'>{allTimeStats?.totalDownvotes}</p>
            <p className='text-sm text-gray-600'>Total Downvotes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTimeStats;


