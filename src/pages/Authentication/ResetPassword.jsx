import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../components/ui';
import { Button, Input } from '@material-tailwind/react';
import { formatErrorMessage, postRequest, showNotification } from '../../utils';
import validator from 'validator';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const token = searchParams.get('token');

  const defaultResetPasswordInfo = {
    Email: '',
    NewPassword: '',
    ConfirmNewPassword: '',
  };

  const [resetPasswordInfo, setResetPasswordInfo] = useState(
    defaultResetPasswordInfo
  );

  const { Email, NewPassword, ConfirmNewPassword } = resetPasswordInfo;

  useEffect(() => {
    if (!token) {
      showNotification({
        title: 'Error',
        message: 'Token is required',
        icon: 'error',
      });
      navigate('/authentication');
    }
  }, [token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setResetPasswordInfo({ ...resetPasswordInfo, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (NewPassword !== ConfirmNewPassword) {
      showNotification({
        title: 'Error',
        message: 'New Passwords do not match',
        icon: 'error',
      });
      return;
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

    if (!token) {
      showNotification({
        title: 'Error',
        message: 'Token is required',
        icon: 'error',
      });
    }

    const formData = new FormData();

    Object.entries(resetPasswordInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await postRequest({
      endpoint: `/user/resetPassword/${token}`,
      data: formData,
    });

    if (res.ok) {
      showNotification({
        title: 'Success',
        message: 'Password Reset Successful',
        icon: 'success',
      });

      navigate('/authentication');

      return;
    }

    showNotification({
      title: 'Error',
      message: formatErrorMessage(res),
      icon: 'error',
    });
  };

  return (
    <div className='bg-gray-400 h-[100vh] flex items-center justify-center'>
      <div className='bg-white w-[90%] md:w-[60%] lg:w-[40%] border-gray-400 rounded px-5 py-8'>
        <PageTitle title='Forgot Password' className='text-center' />

        <form
          className='w-full md:w-[80%] m-auto mt-8 flex flex-col justify-center items-center gap-y-5'
          onSubmit={handleSubmit}>
          <Input
            type='email'
            label='Email'
            name='Email'
            onChange={handleChange}
            value={Email}
            required
          />

          <Input
            type='password'
            label='New Password'
            name='NewPassword'
            onChange={handleChange}
            value={NewPassword}
            required
          />

          <Input
            type='password'
            label='Confirm New Password'
            name='ConfirmNewPassword'
            onChange={handleChange}
            value={ConfirmNewPassword}
            required
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 md:grid-y-0 md:gap-x-8 w-full text-sm lg:text-base'>
            <Button
              size='sm'
              color='red'
              variant='outlined'
              onClick={() => {
                navigate('/authentication');
              }}>
              Cancel
            </Button>
            <Button size='sm' color='green' type='submit'>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

