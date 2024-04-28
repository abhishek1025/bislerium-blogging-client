/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { BsBookmarkCheckFill, BsBookmarkPlus } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatImageUrl, formatViews, useUserAuthContext } from '../../utils';
import { FaEdit } from 'react-icons/fa';

const PostCard = ({ post, refetchBookmarks }) => {
  const { currentUser } = useUserAuthContext();

  const { _id, title, coverImg, content, mentor, createdAt, upVotes, views } =
    post;
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = currentUser?._id === mentor._id;

  return (
    <div className='border rounded-md py-4 px-5 space-y-5'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-x-3'>
          {/* Image */}
          <Link to={`/profile/${mentor?._id}`}>
            <img
              src={`${formatImageUrl(mentor?.userImg)}`}
              alt=''
              className='w-12 h-12 rounded-full'
            />
          </Link>

          {/* Name and Post Date */}
          <div>
            <p className='text-lg font-semibold'>
              <Link to={`/profile/${mentor?._id}`}>{mentor?.name}</Link>
            </p>
            <p className='text-sm text-gray-600'>
              {format(new Date(createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>

        {location.pathname.startsWith('/profile') && isLoggedIn && (
          <div>
            <Link to={`/profile/${currentUser._id}/posts/edit/${_id}`}>
              <FaEdit size={20} color='green' />
            </Link>
          </div>
        )}
      </div>

      <Link to={location.pathname.startsWith('/posts') ? _id : `posts/${_id}`}>
        <div className='flex flex-col md:flex-row gap-x-4 justify-between'>
          <div className='space-y-2 md:w-[60%] lg:w-[70%] mt-3'>
            {/* title */}
            <h2 className='line-clamp-2 md:line-clamp-none text-lg font-bold'>
              {title}
            </h2>

            {/* Explanation */}
            <div
              className='hidden md:line-clamp-2 lg:line-clamp-3 unreset post-card'
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <p className='underline text-blue-600'>
              <Link
                to={
                  location.pathname.startsWith('/posts') ? _id : `posts/${_id}`
                }>
                Read More
              </Link>
            </p>
          </div>

          {/* Cover Image */}
          <div className='mt-4 md:mt-0'>
            <img
              src={`${formatImageUrl(coverImg)}`}
              className='h-[170px] w-[250px] object-cover'
            />
          </div>
        </div>
      </Link>

      {/* Footer */}
      <div className='flex justify-between items-center'>
        <p>
          <span className='text-sm'>{upVotes} likes </span>
          <span className='text-gray-600 font-bold mx-2'>·</span>
          <span className='text-sm'>{formatViews(views)} reads</span>
        </p>
      </div>
    </div>
  );
};

export default PostCard;

