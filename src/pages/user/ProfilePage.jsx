import { Button, Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { ButtonWithHoverEffect } from '../../components';
import {
  base64ToImage,
  deleteRequest,
  fileToBase64,
  formatErrorMessage,
  putRequest,
  removeCookie,
  showNotification,
  useUserAuthContext,
} from '../../utils';
import Swal from 'sweetalert2';
import { COOKIE_NAMES } from '../../constants';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, setCurrentUser, setAuthToken } = useUserAuthContext();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [profileImage, setProfileImage] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUserInfo(currentUser);
    setProfileImageUrl(currentUser?.profilePicture);
  }, [currentUser]);

  // Function to handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    const { firstName, lastName } = userInfo;

    if (!firstName || !lastName) {
      showNotification({
        icon: 'error',
        title: 'Form Validation Error',
        message: 'First Name and Last Name are required',
      });
      return;
    }

    const formData = new FormData();
    formData.append('FirstName', firstName);
    formData.append('LastName', lastName);
    formData.append('ProfilePicture', profileImage);

    const res = await putRequest({
      endpoint: '/user/update',
      data: formData,
    });

    if (res.ok) {
      showNotification({
        icon: 'success',
        title: 'Profile Updated',
        message: 'Profile updated successfully',
      });

      setCurrentUser(prevInfo => {
        return { ...prevInfo, ...userInfo, profilePicture: profileImageUrl };
      });

      setIsEditing(false);

      return;
    }

    showNotification({
      icon: 'error',
      title: 'Error',
      message: formatErrorMessage(res),
    });
  };

  const deleteAccount = async () => {
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
          endpoint: '/user/delete',
        });

        if (res.ok) {
          showNotification({
            title: 'Deleted',
            message: 'Your account has been deleted',
            icon: 'success',
          });

          navigate('/authentication');

          removeCookie(COOKIE_NAMES.AUTH_TOKEN);
          removeCookie(COOKIE_NAMES.USER_ID);

          setAuthToken(null);
          setCurrentUser(null);

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

  const handleImageChange = async e => {
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

    const base64Str = await fileToBase64(file);

    setProfileImageUrl(base64Str);

    setProfileImage(file);
  };

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className='relative'>
      <div className='absolute w-full h-[140px] bg-blue-400'></div>
      <div className='relative z-10 w-[80%] mx-auto rounded-xl flex justify-center flex-col items-center p-4 top-8 space-y-3'>
        <div>
          <img
            src={base64ToImage(profileImageUrl)}
            alt=''
            className='w-[150px] h-[150px] object-cover rounded-full'
          />
        </div>
        {/* if editing xa vane yo dekha */}
        {isEditing ? (
          <>
            <label
              htmlFor='profile-image-upload'
              className='py-2 my-3 cursor-pointer'>
              {' '}
              <FaUpload className='text-blue-600 text-xl' />
            </label>
            <form onSubmit={handleSubmit} className='text-center w-[30%]'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
                id='profile-image-upload'
              />

              <Input
                label='First Name'
                type='text'
                value={userInfo?.firstName}
                onChange={handleChange}
                name='firstName'
                required
              />
              <br />
              <Input
                label='Last Name'
                type='text'
                name='lastName'
                value={userInfo?.lastName}
                onChange={handleChange}
                required
              />
              <br />
              <Input
                label='Email'
                type='email'
                value={userInfo?.email}
                onChange={e => setEmail(e.target.value)}
                readOnly
              />
              <br />
              <div className='flex justify-center items-center gap-x-4'>
                <Button type='submit' size='lg' color='blue'>
                  Save
                </Button>

                <Button
                  type='button'
                  onClick={() => {
                    setIsEditing(false);
                    setProfileImage('');
                    setProfileImageUrl(currentUser?.profilePicture);
                  }}
                  color='red'
                  size='lg'>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className='font-semibold text-2xl text-center'>
              {userInfo?.firstName} {userInfo?.lastName}
            </h1>
            <p>{userInfo?.email}</p>
            <div className='flex gap-5 items-center pt-8'>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              <Button color='red' onClick={deleteAccount}>
                Delete Account
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;

