import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../../utils';
import { BlogCard, Loader, NoDataComponent, PageTitle } from '../../components';

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
    return <Loader />;
  }

  return (
    <div className='bg-white p-6 rounded-lg px-5 py-5 pt-3'>
      <PageTitle title='My Blogs' />
      <br />

      {blogs.length === 0 && <NoDataComponent message='No Blogs Found' />}

      <div className='space-y-8'>
        {blogs?.map(blog => {
          return <BlogCard key={blog.blogId} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default UserBlogs;

