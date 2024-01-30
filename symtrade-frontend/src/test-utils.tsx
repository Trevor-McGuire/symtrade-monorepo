import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { MockLink } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { ReactElement } from 'react';
import mockResponse from './mockResponse';

interface CustomRenderOptions extends RenderOptions {
  route?: string;
  client?: ApolloClient<NormalizedCacheObject>;
}

// Define your default Apollo client
const defaultClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new MockLink([mockResponse]), // Use MockLink to mock network requests
});

function render(
  ui: ReactElement,
  { route = '/', client = defaultClient, ...options }: CustomRenderOptions = {}
): RenderResult {
  window.history.pushState({}, 'Test page', route || '/');

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <ApolloProvider client={client}>
        <Router>
          {children}
        </Router>
      </ApolloProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };