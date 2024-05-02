import React, { useEffect, useState } from 'react';
import TextEditor from '../TextEditor';
import { Button } from '@material-tailwind/react';

const EditComment = ({ commentDetails }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    setDescription(commentDetails.description);
  }, [commentDetails]);

  return (
    <div className='space-y-5'>
      <TextEditor
        value={description}
        setValue={setDescription}
        height={300}
        initialValue={description}
      />

      <Button size='lg'> Update </Button>
    </div>
  );
};

export default EditComment;

