import React, { useState } from 'react';
import { Loader, PageTitle } from '../../components';
import { Button, Input } from '@material-tailwind/react';
import {
  patchRequest,
  postRequest,
  showNotification,
  useUserAuthContext,
} from '../../utils';
import validator from 'validator';

const ChangePasswordPage = () => {
  const defaultPasswordInfo = {
    NewPassword: '',
    CurrentPassword: '',
    ConfirmNewPassword: '',
  };

  const [passwordInfo, setPasswordInfo] = useState(defaultPasswordInfo);

  const { NewPassword, ConfirmNewPassword, CurrentPassword } = passwordInfo;

  const [displayLoader, setDisplayLoader] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (NewPassword !== ConfirmNewPassword) {
      showNotification({
        title: 'Error',
        message: 'New Passwords do not match',
        icon: 'error',
      });
    }

    if (!validator.isStrongPassword(NewPassword)) {
      showNotification({
        title: 'Error',
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
        icon: 'error',
      });

      return;
    }

    setDisplayLoader(true);

    const formData = new FormData();

    Object.entries(passwordInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await postRequest({
      endpoint: `/user/changePassword/`,
      data: formData,
    });

    setDisplayLoader(false);

    if (!res.ok) {
      showNotification({
        title: 'Error',
        message: res.message || 'Unexpected Error Occured, please try later',
        icon: 'error',
      });
      return;
    }

    showNotification({
      title: 'Success',
      message: res.message,
      icon: 'success',
    });

    setPasswordInfo(defaultPasswordInfo);
  };

  return (
    <>
      {displayLoader && <Loader />}

      <div className='bg-white p-6 rounded-lg px-2 md:px-5 py-5 md:pt-3 h-full'>
        <PageTitle title='Change Password' />

        <form onSubmit={handleSubmit}>
          <div className='w-[40%] my-6 space-y-4'>
            <Input
              size='md'
              label='Current Password'
              name='CurrentPassword'
              type='password'
              onChange={handleChange}
              value={CurrentPassword}
              required
            />

            <Input
              size='md'
              label='New Password'
              name='NewPassword'
              type='password'
              onChange={handleChange}
              value={NewPassword}
              required
            />

            <Input
              size='md'
              label='Confirm New Password'
              name='ConfirmNewPassword'
              onChange={handleChange}
              type='password'
              value={ConfirmNewPassword}
              required
            />
          </div>

          <Button size='sm' type='submit'>
            Change Password
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPage;

