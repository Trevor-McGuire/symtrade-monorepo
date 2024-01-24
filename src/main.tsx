import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/homepage';
import MembersOnly from './pages/members-only';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'members-only',
        element: <MembersOnly />,
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement || document.createElement('div'));
root.render(<RouterProvider router={router} />);
