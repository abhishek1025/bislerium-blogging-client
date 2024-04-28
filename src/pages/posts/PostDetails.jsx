import { Breadcrumbs } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { postServices } from '../../services';
import {
    formatImageUrl,
    useCheckVotingStatus,
    useSubmitVote,
    useUserAuthContext
} from '../../utils';

const PostDetails = () => {
  const { postID, userID } = useParams();

  const { currentUser } = useUserAuthContext();
  const viewRecordedRef = useRef(false);

  const {
    data: post,
    isLoading,
    refetch: refetchPostDetails,
    isSuccess,
  } = useQuery({
    queryKey: ['Post'],
    queryFn: postServices.getPostByID(postID),
  });

  const { votingStatus, setVotingStatus, submitVote } =
    useSubmitVote(refetchPostDetails);

  const { data: existingVotingStatus } = useCheckVotingStatus({
    endpoint: `/posts/${postID}/check-vote/${currentUser?._id}`,
    setVotingStatus,
  });

  useEffect(() => {
    // Function to record views
    const recordView = () => {
      if (currentUser?._id && postID && !viewRecordedRef.current) {
        postServices.recordPostViews({ userID: currentUser._id, postID });
        // Mark as recorded to prevent duplicate records
        viewRecordedRef.current = true;
      }
    };

    // Call recordView
    recordView();
  }, [currentUser, postID]);

  const BREAD_CRUMBS = {
    posts: (
      <Breadcrumbs className='bg-white'>
        <Link to='/posts'>Post</Link>
        <span>Post Details</span>
      </Breadcrumbs>
    ),
    bookmarks: (
      <Breadcrumbs className='bg-white'>
        <Link to='/bookmarks'>Bookmarks</Link>
        <Link to='/bookmarks?tab=posts'>Posts</Link>
        <span>Post Details</span>
      </Breadcrumbs>
    ),
    profile: (
      <Breadcrumbs className='bg-white'>
        <Link to={`/profile/${userID}`}>Profile</Link>
        <Link to={`/profile/${userID}?tab=Posts`}>Posts</Link>
        <span>Post Details</span>
      </Breadcrumbs>
    ),
  };

  return (
    <div className='bg-white p-6 rounded-lg px-2 md:px-5 py-5 md:pt-3'>
      {/* Breadcrumbs */}
      {BREAD_CRUMBS[location.pathname.split('/')[1]]}

      {isSuccess && (
        <div className='w-full lg:w-[75%] m-auto'>
          <div className='space-y-5'>
            <h2 className='text-3xl font-bold mt-5'>{post?.title}</h2>

            <div className='flex items-center gap-x-3'>
              {/* Image */}
              <img
                src={`${formatImageUrl(post?.mentor?.userImg)}`}
                alt=''
                className='w-16 h-16 rounded-full'
              />

              {/* Name and Post Date */}
              <div>
                <p className='text-lg font-semibold'>{post?.mentor?.name}</p>

                <p className='text-sm text-gray-600'>
                  Posted at{' '}
                  {format(
                    new Date(post?.createdAt),
                    'MMMM dd, yyyy hh:mm:ss a'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className='border-b border-t flex justify-between items-center py-3 mt-5'>
            <div className='flex gap-x-5 items-center'>
              {/* Upvote */}
              <div className='flex items-center gap-x-1'>
                <button
                  onClick={submitVote({
                    docType: 'post',
                    docID: postID,
                    newVotingStatus: 'upvote',
                    docAuthorID: post?.mentor?._id,
                  })}>
                  {votingStatus === 'upvote' ? (
                    <AiFillLike
                      className='text-black cursor-pointer'
                      size={25}
                    />
                  ) : (
                    <AiOutlineLike
                      className='text-black cursor-pointer'
                      size={25}
                    />
                  )}
                </button>
                <p className='text-xs px-2 py-1 rounded bg-gray-300'>
                  {post?.upVotes}
                </p>
              </div>

              {/* Downvote */}
              <div className='flex items-center gap-x-1'>
                <button
                  onClick={submitVote({
                    docType: 'post',
                    docID: postID,
                    newVotingStatus: 'downvote',
                    docAuthorID: post?.mentor?._id,
                  })}>
                  {votingStatus === 'downvote' ? (
                    <AiFillLike
                      className='text-black cursor-pointer rotate-180'
                      size={25}
                    />
                  ) : (
                    <AiOutlineLike
                      className='text-black cursor-pointer rotate-180'
                      size={25}
                    />
                  )}
                </button>
                <p className='text-xs px-2 py-1 rounded bg-gray-300'>
                  {post?.downVotes}
                </p>
              </div>
            </div>
          </div>

          {/* Cover Img */}
          <div>
            <img
              src={formatImageUrl(post?.coverImg)}
              className='object-cover h-[350px] w-full my-16'
            />
          </div>

          <div
            className='unreset'
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </div>
      )}
    </div>
  );
};

export default PostDetails;

