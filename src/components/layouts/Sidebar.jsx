/* eslint-disable react/prop-types */
import { Tooltip } from "@material-tailwind/react";
import { createContext, useContext, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { useHandleLogOut, useUserAuthContext } from "../../utils";

const SidebarContext = createContext();

export const Sidebar = ({ children }) => {
    const [expanded, setExpanded] = useState(false);

    const { authToken, currentUser } = useUserAuthContext();
    const handleLogOut = useHandleLogOut();

    const handleSidebarExpansion = () => {
        if (window.screen.width >= 1100) {
            setExpanded((curr) => !curr);
        }
    };

    return (
        <aside className={`h-screen ${expanded ? "w-56" : "w-[90px]"} transition-all`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div
                    className={`p-4 pb-2 flex  items-center ${
                        expanded ? "justify-end" : "justify-center"
                    }`}
                >
                    {window.screen.width >= 1100 && (
                        <button
                            onClick={handleSidebarExpansion}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            {expanded ? (
                                <LuChevronFirst size="25px" />
                            ) : (
                                <LuChevronLast size="25px" />
                            )}
                        </button>
                    )}
                </div>

                <SidebarContext.Provider value={{ expanded, currentUser }}>
                    <ul className="flex-1 px-3 gap-y-4 transition-all xl:mt-6">
                        {children}
                    </ul>
                </SidebarContext.Provider>

                {authToken ? (
                    <Tooltip content="Sign Out">
                        <Link to="">
                            <div
                                className={`border-t flex items-center p-3 transition-all h-[50px] hover:text-blue-700 cursor-pointer ${
                                    expanded ? "" : "justify-center"
                                }`}
                                onClick={handleLogOut}
                            >
                                <CiLogin size="25px" className="rotate-180" />

                                <div
                                    className={`
                                flex justify-between items-center
                                overflow-hidden transition-all ${
                                    expanded ? "w-full ml-3" : "w-0 overflow-hidden"
                                }
                            `}
                                >
                                    Sign Out
                                </div>
                            </div>
                        </Link>
                    </Tooltip>
                ) : (
                    <Tooltip content="Sign In">
                        <Link to="/authentication">
                            <div
                                className={`border-t flex items-center p-3 transition-all h-[50px] hover:text-blue-700 cursor-pointer ${
                                    expanded ? "" : "justify-center"
                                }`}
                            >
                                <CiLogin size="25px" />

                                <div
                                    className={`
                                flex justify-between items-center
                                overflow-hidden transition-all ${
                                    expanded ? "w-full ml-3" : "w-0 overflow-hidden"
                                }
                            `}
                                >
                                    Sign In
                                </div>
                            </div>
                        </Link>
                    </Tooltip>
                )}
            </nav>
        </aside>
    );
};

export const SidebarItem = ({ sidebarItem }) => {
    const { icon, text, path } = sidebarItem;
    const { expanded, currentUser } = useContext(SidebarContext);

    // const location = useLocation();

    // const _path = !path.includes("profile")
    //     ? path
    //     : location.pathname.startsWith("/dashboard")
    //     ? `profile/${currentUser?._id}`
    //     : `/profile/${currentUser?._id}`;

    return (
        <NavLink
            to={!path.startsWith("/profile") ? path : `/profile/${currentUser?._id}`}
            end
        >
            {({ isActive }) => {
                return (
                    <li
                        className={`
                    relative flex items-center py-2 px-3 mb-3 rounded-md cursor-pointer
                    transition-colors group
                    ${
                        isActive
                            ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
                            : "hover:bg-blue-50 text-gray-600"
                    }

                    ${!expanded ? "justify-center" : ""}
                `}
                    >
                        {icon}
                        <span
                            className={`
                        overflow-hidden transition-all ${
                            expanded ? "w-full ml-3" : "w-0 m-0 h-0"
                        }`}
                        >
                            {text}
                        </span>

                        {!expanded && (
                            <div className="absolute z-50 left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-800 text-sm invisible -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 ">
                                {text}
                            </div>
                        )}
                    </li>
                );
            }}
        </NavLink>
    );
};
