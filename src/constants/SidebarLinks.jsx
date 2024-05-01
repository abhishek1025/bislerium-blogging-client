import { BiHomeAlt2 } from 'react-icons/bi';
import { BsBookmarkCheck, BsQuestionSquare } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import {
  MdOutlineArticle,
  MdOutlineDashboard,
  MdOutlineEventAvailable,
} from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';
import { RiCommunityLine } from 'react-icons/ri';
import { SlLock } from 'react-icons/sl';
import { TfiAnnouncement, TfiBag } from 'react-icons/tfi';
import { MdErrorOutline } from 'react-icons/md';

export const SIDEBAR_LINKS = [
  {
    text: 'Home',
    icon: <BiHomeAlt2 size='25px' />,
    path: '/',
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

