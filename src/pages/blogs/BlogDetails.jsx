import { Breadcrumbs, Button, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { base64ToImage, getRequest, useUserAuthContext } from '../../utils';
import { CommentsList, EditComment, PostComment } from '../../components';
import { useEffect, useState } from 'react';

const BlogDetails = () => {
  const { blogID } = useParams();

  const { currentUser } = useUserAuthContext();

  const [postComment, setPostComment] = useState(false);
  const [editComment, setEditComment] = useState(false);

  const [editCommentDetails, setEditCommentDetails] = useState({
    commentId: null,
    blogId: null,
    description: '',
  });

  const {
    data: blog,
    isLoading,
    refetch: refetchPostDetails,
    isSuccess,
  } = useQuery({
    queryKey: ['Blog'],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: `/blog/${blogID}`,
      });
      return res.data;
    },
  });

  const votingStatus = 'upvote';

  const handleEditCommentDetails = ({ commentId, description }) => {
    setEditCommentDetails({
      commentId,
      blogId: blogID,
      description,
    });
    setEditComment(true);
  };

  const BREAD_CRUMBS = {
    blogs: (
      <Breadcrumbs className='bg-white'>
        <Link to='/'>Blogs</Link>
        <span>Blog Details</span>
      </Breadcrumbs>
    ),
    'my-blogs': (
      <Breadcrumbs className='bg-white'>
        <Link to='/my-blogs'>My Blogs</Link>
        <span>Blog Details</span>
      </Breadcrumbs>
    ),
  };

  return (
    <div className='bg-white p-6 rounded-lg px-2 md:px-5 py-5 md:pt-3'>
      {isSuccess && (
        <>
          <div className='flex justify-between items-center cursor-pointer'>
            {BREAD_CRUMBS[location.pathname.split('/')[1]]}
          </div>
          <div className='w-full lg:w-[90%] m-auto'>
            <div className='space-y-5'>
              <div className='mt-5'>
                {blog?.isModified && (
                  <p className='text-sm  text-red-600 font-bold'>
                    This blog is modified
                  </p>
                )}

                <h2 className='text-3xl font-bold'>{blog?.title}</h2>
              </div>

              <div className='flex items-center gap-x-3'>
                {/* Image */}
                <img
                  src={base64ToImage(blog?.profilePicture)}
                  alt=''
                  className='w-16 h-16 rounded-full'
                />

                {/* Name and Post Date */}
                <div>
                  <p className='text-lg font-semibold'>{blog?.authorName}</p>

                  <p className='text-sm text-gray-600'>
                    Posted at {blog.createdOn}
                  </p>
                </div>
              </div>
            </div>

            <div className='border-b border-t flex justify-between items-center py-3 mt-5'>
              <div className='flex gap-x-5 items-center'>
                {/* Upvote */}
                <div className='flex items-center gap-x-1'>
                  <button>
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
                  <p className='text-xs px-2 py-1 rounded bg-gray-300'>10</p>
                </div>

                {/* Downvote */}
                <div className='flex items-center gap-x-1'>
                  <button>
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
                  <p className='text-xs px-2 py-1 rounded bg-gray-300'>{10}</p>
                </div>
              </div>
            </div>

            {/* Cover Img */}
            <div>
              <img
                src={base64ToImage(blog?.coverPage)}
                className='object-cover h-[350px] w-full my-16'
              />
            </div>

            <div
              className='unreset'
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />

            <div className='border border-b border-gray-400 mt-5' />

            {/* Comments */}
            <div className='flex justify-between items-center mt-4'>
              <Typography variant='h3'>Comments</Typography>

              <div>
                {postComment || editComment ? (
                  <Button
                    onClick={() => {
                      setPostComment(false);
                      setEditComment(false);
                    }}
                    color='red'>
                    Cancel
                  </Button>
                ) : (
                  <Button onClick={() => setPostComment(true)}>Add</Button>
                )}
              </div>
            </div>

            {postComment && <PostComment />}
            {editComment && <EditComment commentDetails={editCommentDetails} />}

            {!editComment && (
              <div className='mt-8'>
                <CommentsList
                  handleEditCommentDetails={handleEditCommentDetails}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetails;

