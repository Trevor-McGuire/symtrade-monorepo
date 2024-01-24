import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { StrictMode } from 'react';
import { Outlet } from 'react-router-dom';

const link = createHttpLink({
  uri: '/graphql', // Adjust the URI to match your server endpoint
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StrictMode>
        <div className="App">
          <Outlet />
        </div>
      </StrictMode>
    </ApolloProvider>
  );
}

export default App;
