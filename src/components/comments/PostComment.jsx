import React, { useState } from 'react';
import TextEditor from '../TextEditor';
import { Button } from '@material-tailwind/react';


const PostComment = () => {
  const [content, setContent] = useState('');

  return (
    <div className='space-y-5'>
      <TextEditor
        value={content}
        setValue={setContent}
        height={300}
        initialValue={content}
      />

      <Button size='lg'> Submit </Button>
    </div>
  );
};

export default PostComment;

