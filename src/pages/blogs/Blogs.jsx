import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BlogCard,
  ButtonWithHoverEffect,
  Loader,
  NoDataComponent,
  PageTitle,
  PaginationButton,
} from '../../components';
import {
  postRequest,
  showUnauthorizedAccessToast,
  useUserAuthContext,
} from '../../utils';
import { Button } from '@material-tailwind/react';

const Blogs = () => {
  const [randomNum, setRandomNum] = useState(Math.random());

  const FILTER_OPTIONS = {
    RANDOM: 'RANDOM',
    RELEVANT: 'RELEVANT',
    LATEST: 'LATEST',
  };
  // filtering options
  const giveFilterConfig = option => {
    console.log({
      searchByRecency: FILTER_OPTIONS.LATEST === option,
      searchByRank: FILTER_OPTIONS.RELEVANT === option,
      searchByRandom: FILTER_OPTIONS.RANDOM === option,
    });
    return {
      searchByRecency: FILTER_OPTIONS.LATEST === option,
      searchByRank: FILTER_OPTIONS.RELEVANT === option,
      searchByRandom: FILTER_OPTIONS.RANDOM === option,
    };
  };

  const { currentUser } = useUserAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterOptionFromParams = searchParams.get('filter')?.toUpperCase();

  const [page, setPage] = useState(1);

  const LIMIT = 10;

  const navigate = useNavigate();

  const { data: blogs, isLoading: isBlogsFetching } = useQuery({
    queryKey: [page, filterOptionFromParams, randomNum, 'GET ALL BLOGS'],
    queryFn: async () => {
      const res = await postRequest({
        endpoint: '/blog',
        data: {
          pageIndex: page,
          pageSize: LIMIT,
          ...giveFilterConfig(filterOptionFromParams || FILTER_OPTIONS.LATEST),
        },
      });

      return res.data.items || [];
    },
  });

  return (
    <div className='flex gap-x-12 '>
      {isBlogsFetching && <Loader />}

      <div className='flex-1 px-2 md:px-5 py-5 md:p-5 bg-white rounded-lg'>
        <section className='flex flex-col md:flex-row items-center justify-between'>
          <PageTitle title='Blogs' />

          <div className='flex flex-col md:flex-row items-center gap-y-3 gap-x-3 md:mr-3 w-full md:w-auto mt-4'>
            <div className='w-full md:w-auto'>
              <ButtonWithHoverEffect
                className='px-7 rounded-3xl gap-x-2'
                type='button'
                onClick={() => {
                  navigate('/blogs/new');
                }}>
                <FiPlus /> NEW
              </ButtonWithHoverEffect>
            </div>
          </div>
        </section>

        <div className='mb-8 mt-3 space-x-4'>
          <Button
            size='sm'
            onClick={() => {
              if (filterOptionFromParams === FILTER_OPTIONS.LATEST) {
                setSearchParams({});
              } else {
                setSearchParams({
                  filter: FILTER_OPTIONS.LATEST.toLowerCase(),
                });
              }
              setPage(1);
            }}
            variant={
              filterOptionFromParams === FILTER_OPTIONS.LATEST
                ? 'filled'
                : 'outlined'
            }>
            Latest
          </Button>
          <Button
            size='sm'
            onClick={() => {
              setRandomNum(Math.random());

              setSearchParams({
                filter: FILTER_OPTIONS.RANDOM.toLowerCase(),
              });

              setPage(1);
            }}
            variant={
              filterOptionFromParams === FILTER_OPTIONS.RANDOM
                ? 'solid'
                : 'outlined'
            }>
            Random
          </Button>
          <Button
            size='sm'
            onClick={() => {
              if (filterOptionFromParams === FILTER_OPTIONS.RELEVANT) {
                setSearchParams({});
              } else {
                setSearchParams({
                  filter: FILTER_OPTIONS.RELEVANT.toLowerCase(),
                });
              }
              setPage(1);
            }}
            variant={
              filterOptionFromParams === FILTER_OPTIONS.RELEVANT
                ? 'solid'
                : 'outlined'
            }>
            Relevant
          </Button>
        </div>

        {blogs?.length === 0 && (
          <NoDataComponent message='NO POSTS FOUND TO SHOW' />
        )}

        <div className='space-y-5'>
          {blogs
            ?.filter(({ authorId, authorName }) => authorId && authorName)
            ?.map(blog => {
              return <BlogCard key={blog.blogId} blog={blog} />;
            })}
        </div>
        <PaginationButton
          limit={LIMIT}
          page={page}
          setPage={setPage}
          length={blogs?.length}
        />
      </div>
    </div>
  );
};

export default Blogs;

