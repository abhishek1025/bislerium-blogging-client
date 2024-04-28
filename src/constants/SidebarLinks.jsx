import { BiHomeAlt2 } from "react-icons/bi";
import { BsBookmarkCheck, BsQuestionSquare } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import {
    MdOutlineArticle,
    MdOutlineDashboard,
    MdOutlineEventAvailable,
} from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { RiCommunityLine } from "react-icons/ri";
import { SlLock } from "react-icons/sl";
import { TfiAnnouncement, TfiBag } from "react-icons/tfi";
import { MdErrorOutline } from "react-icons/md";

export const SIDEBAR_LINKS = [
    {
        text: "Home",
        icon: <BiHomeAlt2 size="25px" />,
        path: "/",
    },
    {
        text: "Posts",
        icon: <MdOutlineArticle size="25px" />,
        path: "/posts",
        showIfLoggedIn: true,
    },
    {
        text: "Profile",
        icon: <FiUser size="25px" />,
        path: "/profile",
    },
    {
        text: "Community",
        icon: <RiCommunityLine size="25px" />,
        path: "/community",
    },
    {
        text: "Bookmarks",
        icon: <BsBookmarkCheck size="25px" />,
        path: "/bookmarks",
        showIfLoggedIn: true,
    },

    {
        text: "Ask a Question",
        icon: <BsQuestionSquare size="25px" />,
        path: "/ask-question",
    },
    {
        text: "Events",
        icon: <MdOutlineEventAvailable size="25px" />,
        path: "/events",
    },
    {
        text: "Jobs",
        icon: <TfiBag size="25px" />,
        path: "/jobs",
    },
    {
        text: "Change Password",
        icon: <SlLock size="25px" />,
        path: "/change-password",
    },
];

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        text: "Dashboard",
        icon: <MdOutlineDashboard size="25px" />,
        path: "/dashboard",
    },
    {
        text: "Users",
        icon: <PiUsersThree size="25px" />,
        path: "users",
    },

    {
        text: "Error Logs",
        icon: <MdErrorOutline size="25px" />,
        path: "error-logs",
    },
    {
        text: "Announcements",
        icon: <TfiAnnouncement size="25px" />,
        path: "announcements",
    },
    {
        text: "Change Password",
        icon: <SlLock size="25px" />,
        path: "change-password",
    },

    {
        text: "Profile",
        icon: <FiUser size="25px" />,
        path: "profile",
    },
];
