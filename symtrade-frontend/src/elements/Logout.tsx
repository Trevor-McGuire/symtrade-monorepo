import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../graphql/mutations/logout';

const LogoutButton = () => {
  // Get the mutate function
  const [logout, { loading, error }] = useMutation(LOGOUT_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <button onClick={() => logout()}>Logout</button>;
};

export default LogoutButton;