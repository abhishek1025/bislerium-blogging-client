import React, { useEffect, useState } from 'react';
import TextEditor from '../TextEditor';
import { Button } from '@material-tailwind/react';
import { formatErrorMessage, putRequest, showNotification, useBlogDetails, useUserAuthContext } from '../../utils';
import { useParams } from 'react-router-dom';

const EditComment = ({ commentDetails, hideForms, refetchComments }) => {
  const [description, setDescription] = useState('');
  const { sendNotification, currentUser } = useUserAuthContext();

  const { blogID } = useParams();
  const { data: blog } = useBlogDetails(blogID);

  

  useEffect(() => {
    setDescription(commentDetails.description);
  }, [commentDetails]);

  const handleEditComment = async () => {
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
        message: 'Comment should be at least 20 characters long',
        icon: 'error',
      });

      return;
    }

    if (!commentDetails?.commentId) {
      showNotification({
        title: 'Error',
        message: 'Comment Id is required',
        icon: 'error',
      });

      return;
    }

    const formData = new FormData();

    formData.append('Description', description);
    formData.append('BlogId', blogID);

    const res = await putRequest({
      endpoint: `/comment/${commentDetails.commentId}`,
      data: formData,
    });

    if (res.ok) {
      hideForms();

      sendNotification({
        blogId: blogID,
        userId: blog.authorId,
        message: `${currentUser.firstName} has edited a comment on your blog`,
      });


      showNotification({
        title: 'Success',
        message: 'Comment is Updated successfully',
        icon: 'success',
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
      <TextEditor
        value={description}
        setValue={setDescription}
        height={300}
        initialValue={description}
      />

      <Button size='lg' onClick={handleEditComment}>
        Update
      </Button>
    </div>
  );
};

export default EditComment;




