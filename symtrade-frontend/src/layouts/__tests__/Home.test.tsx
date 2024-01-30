import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import Home from '../Home';

test('renders Home component', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Sign In/i);
  expect(linkElement).toBeInTheDocument();
});