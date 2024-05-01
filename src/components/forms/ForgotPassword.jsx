import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from '@material-tailwind/react';

import React, { useState } from 'react';
import { postRequest, showNotification } from '../../utils';

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('email', email);

    const res = await postRequest({
      endpoint: '/user/forgotPassword',
      data: formData,
    });

    handleOpen();

    if (res.ok) {
      showNotification({
        icon: 'success',
        title: 'Password Reset',
        message: 'Check your email to reset your password',
      });
      return;
    }

    showNotification({
      icon: 'error',
      title: 'Error',
      message: res.message || 'Error Occured',
    });
  };

  return (
    <div>
      <button type='button' onClick={handleOpen}>
        <span className='mt-3 text-gray-500 flex justify-end'>
          forgotten password ?
        </span>
      </button>

      <Dialog handler={handleOpen} open={open}>
        <DialogHeader>Forgot Password</DialogHeader>

        <DialogBody>
          <form onSubmit={handleSubmit} id='forgot-password-form'>
            <Input
              type='e'
              label='Email'
              name='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </form>
        </DialogBody>

        <DialogFooter>
          <Button size='sm' variant='text' color='red' onClick={handleOpen}>
            Cancel
          </Button>
          <Button
            size='sm'
            color='green'
            form='forgot-password-form'
            type='submit'>
            Forgot
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;

