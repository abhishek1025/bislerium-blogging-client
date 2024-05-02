import { ArticleOutlined } from '@mui/icons-material';
import { BiHomeAlt2 } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import {
  MdOutlineDashboard
} from 'react-icons/md';
import { SlLock } from 'react-icons/sl';

export const SIDEBAR_LINKS = [
  {
    text: 'Home',
    icon: <BiHomeAlt2 size='25px' />,
    path: '/',
  },
  {
    text: 'My Blogs',
    icon: <ArticleOutlined size='25px' />,
    path: '/my-blogs',
    showIfLoggedIn: true,
  },
  {
    text: 'Profile',
    icon: <FiUser size='25px' />,
    path: '/profile',
    showIfLoggedIn: true,
  },
  {
    text: 'Change Password',
    icon: <SlLock size='25px' />,
    path: '/change-password',
  },
];

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    text: 'Dashboard',
    icon: <MdOutlineDashboard size='25px' />,
    path: '/dashboard',
  },
  {
    text: 'Change Password',
    icon: <SlLock size='25px' />,
    path: 'change-password',
  },

  {
    text: 'Profile',
    icon: <FiUser size='25px' />,
    path: 'profile',
  },
];

