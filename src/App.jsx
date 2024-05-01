import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppLayout } from './components';
import {
  AuthenticationPage,
  ChangePassword,
  HomePage,
  PageNotFound,
  PostBlogForm,
  PostDetails,
  ProfilePage,
  ResetPassword,
} from './pages';

import { useUserAuthContext } from './utils';

function App() {
  const { currentUser } = useUserAuthContext();

  return (
    <>
      <ToastContainer position='bottom-right' />

      <Routes>
        <Route path='forgot-password' element={<ResetPassword />} />

        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />

          <Route path='blogs'>
            <Route path=':blogID' element={<PostDetails />} />
            <Route path='new' element={<PostBlogForm />} />
            <Route path='edit/:blogID' element={<PostBlogForm />} />
          </Route>

          <Route path='change-password' element={<ChangePassword />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>
        <Route path='/authentication' element={<AuthenticationPage />} />

        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      {/* </Suspense> */}
    </>
  );
}

export default App;

