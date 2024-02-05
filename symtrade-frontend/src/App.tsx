import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StrictMode } from 'react';
import { Outlet } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from "./auth-context/auth-context";
import HeaderEl from "./elements/HeaderEl";

const httpLink = createHttpLink({
  uri: '/graphql',
});

let activeSession = localStorage.getItem("activeSession");
activeSession = activeSession ? JSON.parse(activeSession) : null;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const activeSession = localStorage.getItem('activeSession');
  const token = activeSession ? JSON.parse(activeSession).token : null;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StrictMode>
        <AuthProvider>
          <MantineProvider>
            <div className="App">
              <HeaderEl />
              <Outlet />
            </div>
          </MantineProvider>
        </AuthProvider>
      </StrictMode>
    </ApolloProvider>
  );
}

export default App;