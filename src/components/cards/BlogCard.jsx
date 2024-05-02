/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { BsBookmarkCheckFill, BsBookmarkPlus } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  base64ToImage,
  formatImageUrl,
  formatViews,
  useUserAuthContext,
} from '../../utils';
import { FaEdit } from 'react-icons/fa';

const BlogCard = ({ blog, refetchBookmarks }) => {
  const { currentUser } = useUserAuthContext();

  const {
    blogId,
    title,
    coverPage,
    content,
    createdOn,
    isModified,
    authorId,
    authorName,
    profilePicture,
  } = blog;

  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = false;

  return (
    <div className='border rounded-md py-4 px-5 space-y-5'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-x-3'>
          {/* Image */}

          <img
            src={base64ToImage(profilePicture)}
            alt=''
            className='w-12 h-12 rounded-full'
          />

          {/* Name and Post Date */}
          <div>
            <p className='text-lg font-semibold'>{authorName}</p>
            <p className='text-sm text-gray-600'>{createdOn}</p>
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

      <Link
        to={
          location.pathname.startsWith('/')
            ? `blogs/${blogId}`
            : `blogs/${blogId}`
        }>
        <div className='flex flex-col md:flex-row gap-x-4 justify-between'>
          <div className='space-y-2 md:w-[60%] lg:w-[70%] mt-3'>
            <div className='mt-4'>
              {/* title */}
              <h2 className='line-clamp-2 md:line-clamp-none text-lg font-bold'>
                {title}{' '}
                {isModified && (
                  <span className='text-sm  text-red-600 font-bold'>
                    (Edited)
                  </span>
                )}
              </h2>
            </div>
            {/* Explanation */}
            <div
              className='hidden md:line-clamp-2 lg:line-clamp-3 unreset post-card'
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <p className='underline text-blue-600'>
              <Link
                to={
                  location.pathname.startsWith('/blogs')
                    ? `blogs/${blogId}`
                    : `blogs/${blogId}`
                }>
                Read More
              </Link>
            </p>
          </div>

          {/* Cover Image */}
          <div className='mt-4 md:mt-0'>
            <img
              src={base64ToImage(coverPage)}
              className='h-[170px] w-[250px] object-cover'
            />
          </div>
        </div>
      </Link>

      {/* Footer */}
      <div className='flex justify-between items-center'>
        <p>
          <span className='text-sm'>{10} upvote </span>
          <span className='text-gray-600 font-bold mx-2'>·</span>
          <span className='text-sm'>{10} downvote</span>
        </p>
      </div>
    </div>
  );
};

export default BlogCard;


