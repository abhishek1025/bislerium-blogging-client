import { Button, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import {
  base64ToImage,
  deleteRequest,
  formatErrorMessage,
  getRequest,
  showNotification,
  useShowUnauthorizedMessage,
  useSubmitVote,
  useUserAuthContext,
} from '../../utils';
import EditComment from './EditComment';
import PostComment from './PostComment';
import { VOTE_TYPE } from '../../constants';

const CommentsList = () => {
  const [postComment, setPostComment] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const { blogID } = useParams();
  const displayUnauthorizedMsg = useShowUnauthorizedMessage();

  const [editCommentDetails, setEditCommentDetails] = useState({
    commentId: null,
    blogId: null,
    description: '',
  });

  const { data: comments, refetch: refetchComments } = useQuery({
    queryKey: ['Comments'],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: `/comment/${blogID}`,
      });

      return res.data || [];
    },
  });

  const handleEditCommentDetails = ({ commentId, description }) => {
    setEditCommentDetails({
      commentId,
      blogId: blogID,
      description,
    });
    setEditComment(true);
    setPostComment(false);
  };

  const hideForms = () => {
    setPostComment(false);
    setEditComment(false);
  };

  return (
    <div>
      {/* Comments */}
      <div className='my-8'>
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
              <Button
                onClick={() => {
                  if (displayUnauthorizedMsg()) return;
                  setPostComment(true);
                }}>
                Add
              </Button>
            )}
          </div>
        </div>

        {postComment && (
          <PostComment
            hideForms={hideForms}
            refetchComments={refetchComments}
          />
        )}
        {editComment && (
          <EditComment
            commentDetails={editCommentDetails}
            refetchComments={refetchComments}
            hideForms={hideForms}
          />
        )}
      </div>

      <div className='space-y-7'>
        {!editComment &&
          comments &&
          comments.map(comment => {
            return (
              <CommentCard
                handleEditCommentDetails={handleEditCommentDetails}
                key={uuid()}
                comment={comment}
                refetchComments={refetchComments}
              />
            );
          })}
      </div>
    </div>
  );
};

const CommentCard = ({
  handleEditCommentDetails,
  comment,
  refetchComments,
}) => {
  const { currentUser } = useUserAuthContext();
  const {
    commentId,
    createdOn,
    authorId,
    authorName,
    description,
    isModified,
    profilePicture,
  } = comment;

  const { voteType, submitVote } = useSubmitVote({ commentId });

  const handleDeleteComment = () => {
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
          endpoint: `/comment/${commentId}`,
        });

        if (res.ok) {
          showNotification({
            title: 'Deleted',
            message: 'Comment deleted successfully',
            icon: 'success',
          });

          refetchComments();

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
    <div className='border border-gray-400 rounded p-4'>
      {currentUser?.id === authorId && (
        <div className='flex justify-end'>
          <button
            onClick={() =>
              handleEditCommentDetails({
                commentId,
                description,
              })
            }
            className='cursor-pointer'>
            <FaEdit size={25} color='green' />
          </button>

          <button onClick={handleDeleteComment} className='cursor-pointer'>
            <MdDeleteForever size={25} color='red' />
          </button>
        </div>
      )}

      <div className='flex justify-between'>
        <div className='flex items-center gap-x-3'>
          {/* Image */}
          <img
            src={base64ToImage(profilePicture)}
            alt=''
            className='w-16 h-16 rounded-full'
          />

          {/* Name and Post Date */}
          <div>
            <p className='text-lg font-semibold'>{authorName}</p>

            <p className='text-sm text-gray-600'>
              Posted at {createdOn} {isModified && '• Edited'}
            </p>
          </div>
        </div>

        {/* Like Buttons */}
        <div className='flex gap-x-3 items-center'>
          <div className='flex gap-x-5 items-center'>
            {/* Upvote */}
            <div>
              <button
                onClick={submitVote({
                  voteType: VOTE_TYPE.UP_VOTE,
                  authorId,
                })}>
                {voteType === VOTE_TYPE.UP_VOTE ? (
                  <AiFillLike className='text-black cursor-pointer' size={25} />
                ) : (
                  <AiOutlineLike
                    className='text-black cursor-pointer'
                    size={25}
                  />
                )}
              </button>
            </div>

            {/* Downvote */}
            <div>
              <button
                onClick={submitVote({
                  voteType: VOTE_TYPE.DOWN_VOTE,
                  authorId,
                })}>
                {voteType === VOTE_TYPE.DOWN_VOTE ? (
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
            </div>
          </div>
        </div>
      </div>

      <div
        className='unreset mt-4'
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default CommentsList;


