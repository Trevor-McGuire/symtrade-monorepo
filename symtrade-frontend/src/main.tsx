import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import {
  Home,
  SignIn,
  SignedIn,
} from './layouts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'signed-in',
        element: <SignedIn />,
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement || document.createElement('div'));
root.render(<RouterProvider router={router} />);
