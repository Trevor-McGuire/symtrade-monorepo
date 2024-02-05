import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f4f4f4',
      }}
    >
      <h1>SymTrade</h1>
      <nav>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {routes.map(route => 
            route.path !== location.pathname && (
              <li key={route.path}
                style={{
                  padding: '0.5rem',
                }}
              >
                <NavLink to={route.path}>{route.name}</NavLink>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;