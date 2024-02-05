import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import Home from '../HomeLayout';

describe('Home', () => {
  it('renders the Home component', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders the Sign In link', () => {
    render(<Home />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});