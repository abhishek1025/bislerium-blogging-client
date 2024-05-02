import React, { useEffect, useState } from 'react';
import { FaEdit, FaUpload } from 'react-icons/fa';
import { ButtonWithHoverEffect } from '../../components';
import { Input } from '@material-tailwind/react';
import { Breadcrumbs } from '@material-tailwind/react';
import {
  base64ToImage,
  fileToBase64,
  putRequest,
  showNotification,
  useUserAuthContext,
} from '../../utils';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const EditProfilePage = () => {
  const [activeTab, setActiveTab] = useState('html');
  const { currentUser, setCurrentUser } = useUserAuthContext();

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [profileImage, setProfileImage] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

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
    <section className='bg-white p-6 rounded-lg px-2 md:px-5 py-5 md:pt-3 h-full'>
      <>
        <Breadcrumbs className='bg-white m-0 p-0'>
          <Link to='/profile' className='opacity-60'>
            Profile
          </Link>

          <Link>Edit</Link>
        </Breadcrumbs>
      </>

      <div className='flex items-center gap-4 my-8'>
        <img
          src={base64ToImage(profileImageUrl)}
          alt=''
          className='w-[150px] h-[150px] object-cover rounded-full'
        />

        <label htmlFor='profile-image-upload' className='py-2 cursor-pointer'>
          <FaUpload className='text-blue-600 text-xl' />
        </label>
      </div>

      <form onSubmit={handleSubmit} className='text-center w-[30%] mt-7'>
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
          onChange={e => handleChange(e)}
          readOnly
        />
        <br />
        <ButtonWithHoverEffect
          type='submit'
          className='mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>
          Save
        </ButtonWithHoverEffect>
      </form>
    </section>
  );
};

export default EditProfilePage;

