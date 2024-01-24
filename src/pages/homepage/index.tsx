import { useQuery, gql } from '@apollo/client';

const HELLO_QUERY = gql`
  query Query {
    hello
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (error) return <p>Error :\</p>;

  return (
    <div>
      <h1>Home Page</h1>
      {loading ? <p>Loading...</p> : <p>{data.hello}</p>}
    </div>
  );
};

export default HomePage;
