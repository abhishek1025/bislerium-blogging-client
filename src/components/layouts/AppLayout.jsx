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
          if (sidebarItem.path === '/profile' && !currentUser) {
            return null;
          }

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

        <div
          className={`md:px-8 bg-gray-100 h-[100%] flex-1 min-h-0 overflow-auto ${
            location.pathname === '/' ? 'md:pb-0' : 'pb-[120px] md:pb-8'
          }
                    ${location.pathname === '/' ? 'px-0 pt-0' : 'px-3 pt-5'}
                    `}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

