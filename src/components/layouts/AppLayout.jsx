import { Outlet, useLocation } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { Header, Sidebar, SidebarItem } from '../../components';
import { SIDEBAR_LINKS } from '../../constants';
import { useUserAuthContext } from '../../utils';

const AppLayout = () => {
  const { currentUser } = useUserAuthContext();

  const location = useLocation();

  return (
    <div className='h-screen w-screen overflow-hidden flex flex-row'>
      {/* Sidebar */}

      <Sidebar>
        {SIDEBAR_LINKS.map(sidebarItem => {
          return (
            <SidebarItem
              key={uuid4()}
              sidebarItem={sidebarItem}
              currentUser={currentUser}
            />
          );
        })}
      </Sidebar>

      {/* Body */}
      <div className='flex flex-col flex-1'>
        {/* Header */}
        <Header />

        <div className=' bg-gray-100 h-[100%] flex-1 min-h-0 overflow-auto p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

