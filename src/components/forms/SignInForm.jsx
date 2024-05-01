import { Input } from '@material-tailwind/react';
// import PropTypes from "prop-types";
import { useState } from 'react';
import { Link, resolvePath, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createCookie,
  postRequest,
  showNotification,
  useUserAuthContext,
} from '../../utils';
import { COOKIE_NAMES } from '../../constants';
import ForgotPassword from './ForgotPassword';

const SignInForm = ({ authPageContainerRef, setLoader }) => {
  const navigate = useNavigate();
  const { setAuthToken } = useUserAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) {
      showNotification({
        icon: 'error',
        title: 'Sign in Error',
        message: 'Email and Password are required',
      });
      return;
    }

    setLoader(true);

    const res = await postRequest({
      endpoint: '/auth/login',
      data: { email, password },
    });

    setLoader(false);

    if (res.ok) {
      showNotification({
        icon: 'success',
        title: 'Sign in Successful',
        message: 'Welcome back',
      });

      const { userId, token } = res.data;

      setAuthToken(token);

      createCookie(COOKIE_NAMES.USER_ID, userId);
      createCookie(COOKIE_NAMES.AUTH_TOKEN, token);

      navigate('/');

      return;
    }

    showNotification({
      icon: 'error',
      title: 'Error',
      message: res.message,
    });
  };

  return (
    <form className='sign-in-form w-full lg:w-[80%]' onSubmit={handleSubmit}>
      <div>
        <h2 className='font-bold text-2xl'>Sign in</h2>
        <p className='text-gray-600 text-sm mt-1'>
          to Learn, Connect, and Thrive
        </p>
      </div>

      <div className='mt-8 space-y-4'>
        <Input
          type='e'
          label='Email'
          name='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type='password'
          label='Password'
          name='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete='off'
          required
        />
      </div>

      <div className='mt-2 mb-6'>
        <ForgotPassword />
      </div>

      <div>
        <button
          type='submit'
          className='py-2 text-center w-full bg-blue-600 text-white rounded hover:bg-blue-700'>
          Sign in
        </button>
      </div>

      <p>
        Don&apos;t have an account?{' '}
        <button
          className='mt-4 underline text-blue-600'
          type='button'
          onClick={() => {
            if (authPageContainerRef.current) {
              authPageContainerRef.current.classList.add('sign-up-mode');
            }
          }}>
          Register now
        </button>{' '}
      </p>
      <ToastContainer />
    </form>
  );
};

export default SignInForm;

