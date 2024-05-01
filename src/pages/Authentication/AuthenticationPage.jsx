import { useRef, useState } from 'react';
import './authenticationPage.scss';
import GroupStudySecond from '../../assets/images/SignUpPage.svg';
import GroupStudy from '../../assets/images/FeelingProudImg.svg';
import { ImCross } from 'react-icons/im';
import { SignInForm, SignUpForm } from '../../components';

import { Link } from 'react-router-dom';
import { Loader } from '../../components';

const AuthenticationPage = () => {
  const authPageContainerRef = useRef(null);

  const [loader, setLoader] = useState(false);

  return (
    <>
      {loader && <Loader />}
      <div className='auth-page-container' ref={authPageContainerRef}>
        <div className='fixed z-40 right-10 top-5'>
          <Link to='/'>
            <ImCross />
          </Link>
        </div>
        {/*  */}
        <div className='forms-container'>
          <div className='signin-signup'>
            {/* Sign in form */}
            <SignInForm
              authPageContainerRef={authPageContainerRef}
              setLoader={setLoader}
            />

            {/* Sign up form */}
            <SignUpForm
              authPageContainerRef={authPageContainerRef}
              setLoader={setLoader}
            />
          </div>
        </div>

        <div className='panels-container'>
          <div className='panel left-panel'>
            <div className='content'>
              <Link to='/'>
                <h3 className='text-lg'>BisleriumBlogs</h3>
              </Link>
              <p className='pt-2'>Explore. Share. Grow.</p>
            </div>
            <img src={GroupStudy} className='image' alt='' />
          </div>

          <div className='panel right-panel'>
            <div className='content'>
              <div className='content'>
                <h3 className='text-lg'>BisleriumBlogs</h3>
                <p className='pt-2'>Explore. Share. Grow.</p>
              </div>
            </div>
            <img src={GroupStudySecond} className='image' alt='' />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticationPage;

