import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../graphql/mutations';
import { useAuth } from '../auth-context/auth-context';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [logout, { loading, error }] = useMutation(LOGOUT_MUTATION);
  const { setActiveSession } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log('handleSubmit');
    await logout();
    setActiveSession(null);
    navigate('/');
  }

  return <button onClick={handleSubmit}>Logout</button>;
};

export default LogoutButton;