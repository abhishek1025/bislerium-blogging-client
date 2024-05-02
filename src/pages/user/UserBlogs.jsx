import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../../utils';
import { BlogCard } from '../../components';

const UserBlogs = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['Users Blog'],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: '/blogger/view-blog',
      });

      return res.data || [];
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='bg-white w-full space-y-5 px-2 py-3'>
      {blogs?.map(blog => {
        return <BlogCard key={blog.blogId} blog={blog} />;
      })}
    </div>
  );
};

export default UserBlogs;

