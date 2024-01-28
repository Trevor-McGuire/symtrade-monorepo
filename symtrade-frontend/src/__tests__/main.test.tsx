import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from '../App';

const originalCreateRoot = ReactDOM.createRoot;

jest.spyOn(ReactDOM, 'createRoot').mockImplementation((...args) => {
  const root = originalCreateRoot(...args);
  jest.spyOn(root, 'render');
  return root;
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, { container: div });
});
