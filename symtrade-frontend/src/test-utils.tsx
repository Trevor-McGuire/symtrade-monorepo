/**
 * This file, test-utils.tsx, exists to provide a custom
 * render function for our tests.
 * 
 * When testing components in a React application, we often
 * have to 'render' the components in a simulated environment.
 * The default render function provided by 
 * @testing-library/react is not aware of our application's
 * context providers (like ApolloProvider, Router, 
 * MantineProvider, and AuthProvider).
 * 
 * This file exports a custom render function that wraps the
 * component under test with all the necessary providers.
 * This way, we can write tests in the same context as our
 * actual application, ensuring that the tests accurately
 * reflect the app's behavior.
 * 
 * By centralizing this logic in one place, we keep our tests
 * DRY (Don't Repeat Yourself) and increase maintainability.
 */

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {}
  };
};

import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { MockLink } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { MantineProvider } from '@mantine/core';
import {mockLoginResponse} from './mockResponse';
import { AuthProvider } from './auth-context/auth-context';

interface CustomRenderOptions extends RenderOptions {
  route?: string;
  client?: ApolloClient<NormalizedCacheObject>;
}

const defaultClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new MockLink([mockLoginResponse]), 
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
          <MantineProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </MantineProvider>
        </Router>
      </ApolloProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { render };