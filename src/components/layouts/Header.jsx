import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { CiLogout, CiSettings } from 'react-icons/ci';
import { SlLock } from 'react-icons/sl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DefaultProfileImg from '../../assets/images/default-img.avif';
import {
  base64ToImage,
  useHandleLogOut,
  useUserAuthContext,
} from '../../utils';

const LOGO = () => (
  <Link to='/'>
    <p className='text-xl'>
      Bislerium
      <span className='font-bold text-blue-500'>Blogs</span>
    </p>
  </Link>
);

const Header = () => {
  const handleLogOut = useHandleLogOut();
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const { currentUser } = useUserAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className='px-8 py-3 flex items-center justify-between border-b h-[80px] '>
      {/* Logo */}
      <LOGO />

      {/* Profile Section */}
      <section className='flex gap-x-4 items-center'>
        <Link to='/blogs/new'>
          <Button variant='outlined'>New Blog</Button>
        </Link>

        {currentUser ? (
          <div
            className={`w-[55px] h-[55px] rounded-full relative ${
              displayDropdown && 'outline outline-blue-500'
            }`}
            onClick={() => {
              setDisplayDropdown(!displayDropdown);
            }}>
            <img
              src={base64ToImage(currentUser?.profilePicture)}
              alt='User'
              className='w-full h-full cursor-pointer rounded-full'
            />

            {/* Dropdown */}
            {displayDropdown && (
              <div className='absolute z-50 transform -translate-x-[80%] translate-y-3  w-[320px] shadow-lg bg-white py-6 rounded-lg'>
                {/* Image and Name */}
                <div className='flex items-center gap-x-3 px-6'>
                  <img
                    src={base64ToImage(currentUser?.profilePicture)}
                    className='w-[50px] h-[50px] rounded-full'
                  />
                  <p className='font-semibold text-lg'>
                    {currentUser?.firstName}
                  </p>
                </div>

                <div className='border-b mt-4'></div>

                {/* Other Links */}
                <div className='mt-4'>
                  <Link to='profile'>
                    <div className='flex items-center space-x-5 text-gray-800 hover:bg-gray-100 px-6 py-3'>
                      <CiSettings size='25px' />
                      <p>Manage Account</p>
                    </div>
                  </Link>

                  <Link to='/change-password'>
                    <div className='flex items-center space-x-5 text-gray-800 hover:bg-gray-100 px-6 py-3'>
                      <SlLock size='20px' />
                      <p>Change Password</p>
                    </div>
                  </Link>

                  <div
                    className='flex items-center space-x-5 text-gray-800 hover:bg-gray-100 px-6 py-3'
                    onClick={handleLogOut}>
                    <CiLogout size='25px' />
                    <p>Sign out</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='w-[55px] h-[55px] rounded-full  '>
            <Link to='/authentication'>
              <img
                src={DefaultProfileImg}
                alt='User'
                className='w-full h-full cursor-pointer rounded-full'
              />
            </Link>
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;

