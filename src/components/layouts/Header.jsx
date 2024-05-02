import { useRef, useState } from 'react';
import { CiLogin, CiLogout, CiSettings } from 'react-icons/ci';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { SlLock } from 'react-icons/sl';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import DefaultProfileImg from '../../assets/images/default-img.avif';
import { SIDEBAR_LINKS } from '../../constants';
import {
  base64ToImage,
  formatImageUrl,
  useHandleLogOut,
  useUserAuthContext,
} from '../../utils';
import { Button } from '@material-tailwind/react';

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

const MobileViewHeader = () => {
  const mobMenuRef = useRef(null);
  const mobHeaderRef = useRef(null);
  const handleLogOut = useHandleLogOut();

  const { authToken, currentUser } = useUserAuthContext();

  const displayMenu = () => {
    if (mobMenuRef.current) {
      mobMenuRef.current.classList.add('w-full');
      mobMenuRef.current.classList.add('overflow-auto');
      mobMenuRef.current.classList.remove('overflow-hidden');
    }
  };

  const closeMenu = () => {
    if (mobMenuRef.current) {
      mobMenuRef.current.classList.remove('w-full');
      mobMenuRef.current.classList.remove('overflow-auto');
      mobMenuRef.current.classList.add('overflow-hidden');
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className='px-3 py-5 border-b flex items-center justify-between bg-white sticky top-0'
        ref={mobHeaderRef}>
        <div onClick={displayMenu}>
          <GiHamburgerMenu size='30px' />
        </div>

        <LOGO />
      </div>

      {/* Menu */}
      <div
        className='fixed bg-black w-0 top-0 left-0 bg-opacity-40 transition-all duration-150 overflow-scroll z-10'
        style={{
          height: window.innerHeight,
        }}
        ref={mobMenuRef}>
        <div className='flex flex-col h-full bg-white w-[80%] overflow-scroll py-4 px-4'>
          <div>
            {/*  Image and Name  */}
            {currentUser ? (
              <>
                <div className='flex items-center justify-between'>
                  <img
                    src={formatImageUrl(currentUser.userImg)}
                    alt='User'
                    className='w-[50px] h-[50px] rounded-full outline outline-blue-500'
                  />

                  <div onClick={closeMenu}>
                    <RxCross2 size='30px' />
                  </div>
                </div>
                <p className='font-semibold text-lg mt-4'>{currentUser.name}</p>
              </>
            ) : (
              <div className='w-[55px] h-[55px] rounded-full  '>
                <img
                  src={DefaultProfileImg}
                  alt='User'
                  className='w-full h-full cursor-pointer rounded-full'
                />
              </div>
            )}
          </div>

          <ul className='flex-1 py-5 pb-20'>
            {SIDEBAR_LINKS.map(({ text, icon, path }) => (
              <NavLink
                to={path === '/profile' ? `/profile/${currentUser?._id}` : path}
                key={uuid4()}
                onClick={closeMenu}>
                {({ isActive }) => (
                  <li
                    className={`
                                            relative flex items-center py-2 px-3 mb-5 rounded-md cursor-pointer
                                            transition-colors group
                                            ${
                                              isActive
                                                ? 'bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800'
                                                : 'hover:bg-blue-50 text-gray-600'
                                            }
                                        `}>
                    {icon}
                    <span className='overflow-hidden transition-all w-full ml-3'>
                      {text}
                    </span>
                  </li>
                )}
              </NavLink>
            ))}

            {authToken ? (
              <div
                className='border-t flex items-center p-3 transition-all h-[50px] hover:text-blue-700 cursor-pointer gap-x-4'
                onClick={handleLogOut}>
                <CiLogin size='25px' className='rotate-180' />
                Sign Out
              </div>
            ) : (
              <Link to='/authentication'>
                <div className='border-t flex items-center p-3 transition-all h-[50px] hover:text-blue-700 cursor-pointer gap-x-4'>
                  <CiLogin size='25px' />
                  Sign In
                </div>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

