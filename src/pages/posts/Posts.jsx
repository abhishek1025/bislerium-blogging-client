import { Input, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import {
  ButtonWithHoverEffect,
  NoDataComponent,
  PageTitle,
  PaginationButton,
  PostCard,
} from '../../components';
import { postServices } from '../../services';
import {
  formatImageUrl,
  formatViews,
  showUnauthorizedAccessToast,
  useDebounce,
  useUserAuthContext,
} from '../../utils';
import { FaSearch } from 'react-icons/fa';

const Posts = () => {
  const { currentUser } = useUserAuthContext();
  const [page, setPage] = useState(1);
  const [trendingPostDuration, setTrendingPostDuration] = useState('weekly');
  const LIMIT = 5;

  const [searchText, setSearchText] = useState('');

  const debouncedSearchTextValue = useDebounce(searchText, 1000);

  const navigate = useNavigate();

  const { data: posts, isLoading: isPostsFetching } = useQuery({
    queryKey: [
      page,
      currentUser?._id,
      debouncedSearchTextValue,
      'GET POSTS OF FOLLOWING MENTORS',
    ],
    queryFn: postServices.getPostsOfFollowingMentor({
      userID: currentUser?._id,
      LIMIT,
      searchText,
    }),
    enabled: !!currentUser,
  });

  const { data: trendingPosts, isLoading: isTrendingPostsFetching } = useQuery({
    queryKey: [trendingPostDuration, 'trending posts'],
    queryFn: postServices.getTrendingPosts,
  });

  const { data: featuredMentors, isLoading: isFeaturedMentorsFetching } =
    useQuery({
      queryKey: ['featured mentors'],
      queryFn: postServices.getFeaturedMentors,
    });

  return (
    <div className='flex gap-x-12'>
      <div className='flex-1 px-2 md:px-5 py-5 md:p-5 bg-white space-y-7 rounded-lg'>
        <section className='flex flex-col md:flex-row items-center justify-between'>
          <PageTitle title='Posts' />

          <div className='flex flex-col md:flex-row items-center gap-y-3 gap-x-3 md:mr-3 w-full md:w-auto mt-4'>
            <section className='w-full md:w-[300px]'>
              <Input
                type='text'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                icon={<FaSearch />}
                label='Search Posts'
              />
            </section>

            <div className='w-full md:w-auto'>
              <ButtonWithHoverEffect
                className='px-7 rounded-3xl gap-x-2'
                type='button'
                onClick={showUnauthorizedAccessToast({
                  navigate,
                  currentUser,
                  path: 'new',
                })}>
                <FiPlus /> NEW
              </ButtonWithHoverEffect>
            </div>
          </div>
        </section>

        {posts?.length === 0 && (
          <NoDataComponent message='NO POSTS FOUND TO SHOW' />
        )}

        {posts?.map(post => {
          return <PostCard key={post._id} post={post} />;
        })}

        <PaginationButton
          limit={LIMIT}
          page={page}
          setPage={setPage}
          length={posts?.length}
        />
      </div>

      <div className='w-[30%] bg-white hidden lg:block p-6 rounded-lg'>
        {/* Featured Mentors */}
        <div>
          <Typography variant='h6'>Featured Mentors</Typography>

          <div className='space-y-5 mt-3 mb-10'>
            {featuredMentors.map(({ postsCount, mentor, _id }) => (
              <div key={_id}>
                <Link to={`/profile/${_id}`}>
                  <div className='flex items-center space-x-3'>
                    <img
                      src={formatImageUrl(mentor.userImg)}
                      alt='mentor'
                      className='w-12 h-12 rounded-full'
                    />
                    <div>
                      <p className='font-semibold'>{mentor.name}</p>
                      <p className='text-sm text-gray-700'>
                        {postsCount} posts
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Trending posts */}
        <div className='flex items-center justify-between'>
          <Typography variant='h6'>Trending Posts</Typography>

          <div>
            <select
              className='border border-black outline-none rounded w-32 py-1 px-2 cursor-pointer'
              value={trendingPostDuration}
              onChange={e => setTrendingPostDuration(e.target.value)}>
              <option value='weekly'>This Week</option>
              <option value='monthly'>This Month</option>
              <option value='yearly'>This Year</option>
            </select>
          </div>
        </div>

        <div className='mt-8 space-y-5'>
          {isTrendingPostsFetching && (
            <>
              <TrendingArticlesLoader />
              <TrendingArticlesLoader />
              <TrendingArticlesLoader />
              <TrendingArticlesLoader />
              <TrendingArticlesLoader />
            </>
          )}

          {trendingPosts?.map(({ _id, mentor, views, title }) => (
            <div key={_id}>
              <p className='font-semibold line-clamp-2'>
                {' '}
                <Link to={_id}>{title} </Link>
              </p>

              <div className='mt-1 text-sm text-gray-700'>
                <span>{mentor.name} </span> <span className='mx-2'>·</span>
                <span>{formatViews(views)} reads</span>
              </div>
            </div>
          ))}

          {trendingPosts?.length === 0 && (
            <Typography className='font-semibold text-sm'>
              No Trending Posts Found
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;

