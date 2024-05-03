import { Editor } from '@tinymce/tinymce-react';
import { PropTypes } from 'prop-types';
import { EDITOR_API_KEY } from '../config';

const TextEditor = ({ height, value, setValue }) => {
  return (
    <Editor
      value={value}
      apiKey={EDITOR_API_KEY}
      init={{
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        height,
      }}
      onEditorChange={(newValue, editor) => {
        setValue(newValue);
      }}
    />
  );
};

export default TextEditor;

