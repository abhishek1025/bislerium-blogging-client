/* eslint-disable react/prop-types */
import { Delete } from '@mui/icons-material';
import { FaEdit } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  base64ToImage,
  deleteRequest,
  formatErrorMessage,
  showNotification,
  useUserAuthContext,
} from '../../utils';
import Swal from 'sweetalert2';
import { Typography } from '@material-tailwind/react';

const BlogCard = ({ blog, refetchBookmarks }) => {
  const { currentUser, authToken: isLoggedIn } = useUserAuthContext();

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
    score,
  } = blog;

  const location = useLocation();
  const navigate = useNavigate();

  const isThisMyBlogsPage = location.pathname.startsWith('/my-blogs');

  const deleteBlog = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await deleteRequest({
          endpoint: `/blogger/delete-blog/${blogId}`,
        });

        if (res.ok) {
          showNotification({
            title: 'Deleted',
            message: 'Blog deleted successfully',
            icon: 'success',
          });

          refetchBlogs();

          return;
        }

        showNotification({
          title: 'Error',
          message: formatErrorMessage(res),
          icon: 'error',
        });
      }
    });
  };

  return (
    <div className='border rounded-md py-4 px-5 space-y-5'>
      <div className='flex justify-between mb-4'>
        <div className='flex items-center gap-x-3'>
          {/* Image */}
          <img
            src={base64ToImage(
              isThisMyBlogsPage ? currentUser?.profilePicture : profilePicture
            )}
            alt=''
            className='w-12 h-12 rounded-full'
          />

          {/* Name and Post Date */}
          <div>
            <p className='text-lg font-semibold'>
              {isThisMyBlogsPage
                ? `${currentUser?.firstName} ${currentUser?.lastName}`
                : authorName}
            </p>
            <p className='text-sm text-gray-600'>{createdOn}</p>
          </div>
        </div>

        {isThisMyBlogsPage && isLoggedIn && (
          <div className='flex gap-x-5 items-center'>
            <Link to={`/my-blogs/edit/${blogId}`}>
              <FaEdit size={25} color='green' />
            </Link>

            <button type='button' className='cursor-pointer'>
              <Delete className='text-red-600 text-xl' onClick={deleteBlog} />
            </button>
          </div>
        )}
      </div>

      <Link to={isThisMyBlogsPage ? blogId : `blogs/${blogId}`}>
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
              <Link to={isThisMyBlogsPage ? blogId : `blogs/${blogId}`}>
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
    </div>
  );
};

export default BlogCard;

