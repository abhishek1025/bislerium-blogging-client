import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppLayout } from './components';
import { PageNotFound } from './pages';
import HomePage from './pages/HomePage';
import { useUserAuthContext } from './utils';

function App() {
  const { currentUser } = useUserAuthContext();

  return (
    <>
      <ToastContainer position='bottom-right' />

      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      {/* </Suspense> */}
    </>
  );
}

export default App;

