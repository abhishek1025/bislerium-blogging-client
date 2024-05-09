import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ErrorPage } from './pages/index.js';
import { UserAuthContextProvider } from './contexts/UserAuthContext.jsx';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <ErrorBoundary FallbackComponent={ErrorPage}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserAuthContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </UserAuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  // </ErrorBoundary>
);

