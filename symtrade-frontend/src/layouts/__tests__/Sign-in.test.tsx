import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import SignInLayout from '../AuthenticationLayout';

describe('Home', () => {
  it('renders the SignInLayout component', () => {
    render(<SignInLayout />);
    expect(screen.getByTestId('sign-in-layout')).toBeInTheDocument();
  });

  it('renders the Home link', () => {
    render(<SignInLayout />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders the sign-in element within the sign-in layout', () => {
    render(<SignInLayout />);
    expect(screen.getByTestId('sign-in-element')).toBeInTheDocument();
  });
});