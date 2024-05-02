import { Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { ButtonWithHoverEffect } from '../../components';
import {
  base64ToImage,
  fileToBase64,
  putRequest,
  showNotification,
  useUserAuthContext,
} from '../../utils';

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useUserAuthContext();

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

    console.log(res);

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
      message: res.message || 'Profile Update Error',
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
              <ButtonWithHoverEffect
                type='submit'
                className='mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>
                Save
              </ButtonWithHoverEffect>
            </form>
          </>
        ) : (
          <>
            <h1 className='font-semibold text-2xl text-center'>
              {userInfo?.firstName} {userInfo?.lastName}
            </h1>
            <p>{userInfo?.email}</p>
            <div className='w-[15%] flex gap-5 items-center'>
              <ButtonWithHoverEffect onClick={() => setIsEditing(true)}>
                Edit
              </ButtonWithHoverEffect>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;

