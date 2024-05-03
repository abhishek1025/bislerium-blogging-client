import { Button, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { base64ToImage } from '../../utils';
import EditComment from './EditComment';
import PostComment from './PostComment';
import { useParams } from 'react-router-dom';

const CommentsList = () => {
  const [postComment, setPostComment] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const { blogID } = useParams();

  const [editCommentDetails, setEditCommentDetails] = useState({
    commentId: null,
    blogId: null,
    description: '',
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
              <Button onClick={() => setPostComment(true)}>Add</Button>
            )}
          </div>
        </div>

        {postComment && <PostComment />}
        {editComment && <EditComment commentDetails={editCommentDetails} />}
      </div>

      {!editComment && (
        <CommentCard handleEditCommentDetails={handleEditCommentDetails} />
      )}
    </div>
  );
};

const CommentCard = ({ handleEditCommentDetails }) => {
  return (
    <div className='border border-gray-400 rounded p-4'>
      <div className='flex justify-end gap-x-3'>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => {
            handleEditCommentDetails({
              commentId: 123456,
              description: 'Comment',
            });
          }}>
          <FaEdit size={25} color='green' />
        </button>
        <button type='button' className='cursor-pointer'>
          <MdDeleteForever size={25} color='red' />
        </button>
      </div>

      <div className='flex justify-between'>
        <div className='flex items-center gap-x-3'>
          {/* Image */}
          <img
            src={base64ToImage('')}
            alt=''
            className='w-16 h-16 rounded-full'
          />

          {/* Name and Post Date */}
          <div>
            <p className='text-lg font-semibold'>Abhishek shrestha</p>

            <p className='text-sm text-gray-600'>
              Posted at 02/05/2024 13:38:37 • Edited
            </p>
          </div>
        </div>

        <div className='flex gap-x-3 items-center'>
          <AiOutlineLike className='text-black cursor-pointer' size={25} />

          <AiOutlineLike
            className='text-black cursor-pointer rotate-180'
            size={25}
          />
        </div>
      </div>

      <div className='mt-4'>
        You totally convinced me that in some cases using react is pure
        overhead. Why not use a webcomponent? Even plain JS would do the job...
        Please check out this demo, which requires less than 10 lines of code.
      </div>
    </div>
  );
};

export default CommentsList;

