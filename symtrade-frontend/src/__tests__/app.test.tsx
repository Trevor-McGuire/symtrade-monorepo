import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders App and updates count on button click', () => {
  const { getByText } = render(<App />);

  // Check if "Vite + React" is in the document
  expect(getByText('Vite + React')).toBeInTheDocument();

  // Find the button and click it
  const button = getByText(/count is/i);
  fireEvent.click(button);

  // Check if the count has been updated
  expect(getByText('count is 1')).toBeInTheDocument();
});
