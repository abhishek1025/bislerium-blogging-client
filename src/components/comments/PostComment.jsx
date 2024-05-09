import React, { useState } from 'react';
import TextEditor from '../TextEditor';
import { Button } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import {
  formatErrorMessage,
  postRequest,
  showNotification,
  useBlogDetails,
  useUserAuthContext,
} from '../../utils';

const PostComment = ({ refetchComments, hideForms }) => {
  const { sendNotification, currentUser } = useUserAuthContext();

  const { blogID } = useParams();

  const { data: blog } = useBlogDetails(blogID);

  const [description, setDescription] = useState('');

  const handlePostComment = async () => {
    if (!description) {
      showNotification({
        title: 'Error',
        message: 'Please enter a comment',
        icon: 'error',
      });

      return;
    }

    if (description.length < 20) {
      showNotification({
        title: 'Error',
        message: 'Comment should be atleast 20 characters long',
        icon: 'error',
      });

      return;
    }

    const formData = new FormData();

    formData.append('Description', description);

    const res = await postRequest({
      endpoint: `/comment/${blogID}`,
      data: formData,
    });

    if (res.ok) {
      hideForms();

      showNotification({
        title: 'Success',
        message: 'Comment posted successfully',
        icon: 'success',
      });

      sendNotification({
        userId: blog.authorId,
        message: `${currentUser.firstName} has posted a comment on your blog`,
      });

      setDescription('');

      refetchComments();

      return;
    }

    showNotification({
      title: 'Error',
      message: formatErrorMessage(res),
      icon: 'error',
    });
  };

  return (
    <div className='space-y-5'>
      <TextEditor value={description} setValue={setDescription} height={300} />

      <Button size='lg' onClick={handlePostComment}>
        Submit
      </Button>
    </div>
  );
};

export default PostComment;



