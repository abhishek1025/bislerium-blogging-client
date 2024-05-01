import { Input } from '@material-tailwind/react';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { postRequest, showNotification } from '../../utils';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ authPageContainerRef, setLoader }) => {
  const defaultUserInfo = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    IsAdmin: false,
    ProfilePicture: '',
  };

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const navigate = useNavigate();


  const { FirstName, LastName, Email, Password, ConfirmPassword } = userInfo;

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;

    setUserInfo(prevUserInfo => {
      return { ...prevUserInfo, [name]: value };
    });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];

    const fileSize = file.size / (1024 * 1024);

    e.target.value = '';

    if (fileSize > 3) {
      showNotification({
        icon: 'error',
        title: 'Image Upload Error',
        message: 'Image size should not exceed 3MB',
      });
      return;
    }

    setUserInfo(prevUserInfo => {
      return { ...prevUserInfo, ProfilePicture: file };
    });

    setProfileImage(URL.createObjectURL(file));
  };

  const userInfoValidation = () => {
    if (!FirstName || !LastName || !Email || !Password || !ConfirmPassword) {
      showNotification({
        icon: 'error',
        title: 'Validation Error',
        message: 'All fields are required',
      });

      return false;
    }

    if (Password !== ConfirmPassword) {
      showNotification({
        icon: 'error',
        title: 'Validation Error',
        message: 'Passwords do not match',
      });

      return false;
    }

    if (!validator.isStrongPassword(Password)) {
      showNotification({
        icon: 'error',
        title: 'Validation Error',
        message:
          'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
      });

      return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(userInfo).forEach(info => {
      const [key, value] = info;
      formData.append(key, value);
    });

    if (!userInfoValidation()) {
      return;
    }

    setLoader(true);

    const res = await postRequest({
      endpoint: '/user/register',
      data: formData,
    });

    setLoader(false);

    if (res.ok) {
      showNotification({
        icon: 'success',
        title: 'Account Created',
        message: 'Your account has been created successfully',
      });

      setUserInfo(defaultUserInfo);
      setProfileImage(null);

      return;
    }

    showNotification({
      icon: 'error',
      title: 'Account Creation Error',
      message: res.message,
    });
  };

  return (
    <>
      <form className='sign-up-form w-full lg:w-[80%]' onSubmit={handleSubmit}>
        {/* Sign up form title */}
        <div>
          <h2 className='font-bold text-2xl'>Create your account</h2>
          <p className='text-gray-600 text-sm mt-1'>
            Join our Family and Become part of us.
          </p>
        </div>

        <div className='my-3 space-y-4'>
          <div className='space-y-4 flex items-center gap-5'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
              id='profile-image-upload'
            />
            <div className='w-24 h-24 border-2 object-cover border-gray-300 rounded-full overflow-hidden flex items-center justify-center text-center'>
              {profileImage ? (
                <div>
                  <img
                    src={profileImage}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>
              ) : (
                <div>Upload Image</div>
              )}
            </div>
            <label
              htmlFor='profile-image-upload'
              className='py-2 my-3 cursor-pointer'>
              {' '}
              <FaUpload className='text-blue-600 text-xl' />
            </label>
          </div>

          <div className='flex items-center gap-4'>
            <Input
              type='text'
              label='First Name'
              name='FirstName'
              onChange={handleChange}
              value={FirstName}
              required
            />
            <Input
              type='text'
              label='Last Name'
              name='LastName'
              value={LastName}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            type='email'
            label='Email'
            name='Email'
            value={Email}
            onChange={handleChange}
            required
          />

          <Input
            type='password'
            label='Password'
            name='Password'
            value={Password}
            onChange={handleChange}
            required
            autoComplete='on'
          />
          <Input
            type='password'
            label='Confirm Password'
            name='ConfirmPassword'
            value={ConfirmPassword}
            onChange={handleChange}
            required
            autoComplete='on'
          />
        </div>

        <div className=''>
          <button
            type='submit'
            className='py-2 text-center w-full bg-blue-600 text-white rounded hover:bg-blue-700'>
            Sign Up
          </button>
        </div>

        <p className='mt-2'>
          Already have an account?{' '}
          <button
            className='mt-3 underline text-blue-600'
            type='button'
            onClick={() => {
              if (authPageContainerRef.current) {
                authPageContainerRef.current.classList.remove('sign-up-mode');
              }
            }}>
            Sign in
          </button>{' '}
        </p>
      </form>
    </>
  );
};

export default SignUpForm;



