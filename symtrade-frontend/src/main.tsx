import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import {
  HomeLayout,
  SignInLayout,
  SignedInLayout,
} from './layouts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeLayout />,
      },
      {
        path: 'login',
        element: <SignInLayout />,
      },
      {
        path: 'register',
        element: <SignInLayout />,
      },
      {
        path: 'signed-in',
        element: <SignedInLayout />,
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement || document.createElement('div'));
root.render(<RouterProvider router={router} />);
