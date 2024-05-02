import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppLayout, ProtectedRoutes } from './components';
import {
  AuthenticationPage,
  ChangePassword,
  EditProfilePage,
  HomePage,
  PageNotFound,
  PostBlogForm,
  PostDetails,
  ProfilePage,
  ResetPassword,
  UserBlogs,
} from './pages';

import { useUserAuthContext } from './utils';

function App() {
  const { currentUser } = useUserAuthContext();

  return (
    <>
      <ToastContainer position='bottom-right' />

      <Routes>
        <Route path='forgot-password' element={<ResetPassword />} />

        <Route path='/authentication' element={<AuthenticationPage />} />

        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/blogs/:blogID' element={<PostDetails />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='my-blogs'>
              <Route path=':blogID' element={<PostDetails />} />
              <Route index element={<UserBlogs />} />
              <Route path='edit/:blogID' element={<PostBlogForm />} />
            </Route>

            <Route path='blogs/new' element={<PostBlogForm />} />

            <Route path='change-password' element={<ChangePassword />} />
            <Route path='profile' element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      {/* </Suspense> */}
    </>
  );
}

export default App;

