import { ArticleOutlined } from '@mui/icons-material';
import { BiHomeAlt2 } from 'react-icons/bi';
import { FiUser, FiUsers } from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';
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

  ...SIDEBAR_LINKS,

  {
    text: 'Admins',
    icon: <FiUsers size='25px' />,
    path: '/all-admins',
  },
];

export const ALL_SIDEBAR_LINKS = {
  USER: SIDEBAR_LINKS,
  ADMIN: DASHBOARD_SIDEBAR_LINKS,
};

