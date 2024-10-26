import { Breadcrumbs, Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { Oval } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader, TextEditor } from '../../components';
import {
  base64ToImage,
  fileToBase64,
  formatErrorMessage,
  getRequest,
  postRequest,
  putRequest,
  showNotification
} from '../../utils';

const PostBlogForm = () => {
  const { blogID } = useParams();

  const [coverImgURL, setCoverImgURL] = useState();
  const [coverImgFile, setCoverImgFile] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState('');
  const [displayLoader, setDisplayLoader] = useState(false);
  const [displayPreview, setDisplayPreview] = useState(false);
  const navigate = useNavigate();

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', blogID],

    queryFn: async () => {
      const res = await getRequest({
        endpoint: `/blog/${blogID}`,
      });

      return res.data || null;
    },
    enabled: !!blogID,
  });

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setCoverImgURL(blog.coverPage);
    }
  }, [blog]);

  const handleFileChange = async e => {
    const imgFile = e.target.files[0];

    const fileBase64 = await fileToBase64(imgFile);

    if (imgFile) {
      setCoverImgFile(imgFile);
      setCoverImgURL(fileBase64);
      e.target.value = '';
    }
  };

  const handleAddAndUpdatePostOperations = async () => {
    if (!title || !content) {
      showNotification({
        message: 'Title, Cover image and Content are required',
        title: 'Error',
        icon: 'error',
      });

      return;
    }

    if (!blogID && !coverImgFile) {
      showNotification({
        message: 'Cover image is required required',
        title: 'Error',
        icon: 'error',
      });

      return;
    }

    if (blogID && !coverImgURL && !coverImgFile) {
      showNotification({
        message: 'Cover image is required',
        title: 'Error',
        icon: 'error',
      });

      return;
    }

    if (content.split('').length < 200) {
      showNotification({
        message: 'Content should be at least 200 characters',
        title: 'Error',
        icon: 'error',
      });
      return;
    }

    const formData = new FormData();

    formData.append('Title', title);
    formData.append('Content', content);
    formData.append('CoverPage', coverImgFile);

    setDisplayLoader(true);

    let res;

    if (blogID) {
      res = await putRequest({
        endpoint: `/blogger/update-blog/${blogID}`,
        data: formData,
      });
    } else {
      res = await postRequest({
        endpoint: '/blogger/add-blog',
        data: formData,
      });
    }

    setDisplayLoader(false);

    if (res.ok) {
      if (!blogID) {
        showNotification({
          message: 'Blog is posted successfully',
          title: 'Success',
          icon: 'success',
        });

        setTitle('');
        setContent('');
        setCoverImgURL();
        setCoverImgFile();
        return;
      }

      showNotification({
        message: 'Blog is updated successfully',
        title: 'Success',
        icon: 'success',
      });

      return;
    }

    showNotification({
      message: formatErrorMessage(res),
      title: 'Error',
      icon: 'error',
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className='bg-white p-6 rounded-lg px-2 md:px-5 py-5 md:pt-3'>
        {blogID ? (
          <Breadcrumbs className='bg-white mb-4'>
            <Link to='/my-blogs'>My Blogs</Link>
            <span>Edit</span>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs className='bg-white mb-4'>
            <Link to='/'>Blogs</Link>
            <span>New</span>
          </Breadcrumbs>
        )}

        <div className='w-full lg:w-[80%] m-auto'>
          <div>
            {displayLoader ? (
              <Button className='mb-8 flex items-center gap-x-4 bg-gray-800'>
                <Oval
                  visible={true}
                  height='20'
                  width='20'
                  color='white'
                  ariaLabel='oval-loading'
                  strokeWidth='5'
                  secondaryColor='white'
                />
                <p>{!blogID ? 'Posting' : 'Updating'}</p>
              </Button>
            ) : (
              <div className='space-x-2 mb-8'>
                <Button
                  onClick={handleAddAndUpdatePostOperations}
                  size='sm'
                  disabled={!!!content}>
                  <p>{!blogID ? 'Post' : 'Update Post'}</p>
                </Button>

                <Button
                  variant='outlined'
                  size='sm'
                  onClick={() => setDisplayPreview(_prevValue => !_prevValue)}
                  disabled={!!!content}>
                  <p>{displayPreview ? 'Hide' : 'Show'} Preview</p>
                </Button>
              </div>
            )}
          </div>

          <div>
            <button
              className='flex items-center gap-x-3'
              onClick={() => {
                document.querySelector('#coverImgInputEl').click();
              }}>
              <MdOutlinePhotoSizeSelectActual />
              <p> Add Cover</p>
            </button>

            <input
              type='file'
              accept='image/*'
              hidden
              id='coverImgInputEl'
              onChange={handleFileChange}
            />
          </div>
          {/* CoverImg Display */}
          <textarea
            className='my-5 text-3xl font-bold w-full  outline-none placeholder:text-black resize-none'
            placeholder='Enter title......'
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              e.target.style.height = '0';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          {coverImgURL && (
            <div className='relative'>
              <button
                className='bg-white absolute right-2 top-2 py-2 px-3 rounded bg-opacity-80'
                onClick={() => {
                  setCoverImgURL(); // setting cover image url
                  setCoverImgFile(); // setting cover image file
                }}>
                <RxCross2 size={20} />
              </button>

              <img
                src={base64ToImage(coverImgURL)} //base64toImage to make image visible
                alt=''
                className='w-full h-[400px] object-cover rounded-lg mb-8'
              />
            </div>
          )}

          <div className='w-full'>
            {displayPreview && (
              <div className='my-8 unreset'>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </div>
            )}
          </div>
          {!displayPreview && (
            <div className='mb-5'>
              <TextEditor
                value={content}
                setValue={setContent}
                height={700}
                initialValue={content}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostBlogForm;



