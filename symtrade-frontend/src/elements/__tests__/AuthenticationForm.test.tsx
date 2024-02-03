import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import {AuthenticationForm} from '../AuthenticationForm';
// import { fireEvent } from '@testing-library/react';

describe('AuthenticationForm tests', () => {
  it('has the test id sign-in-element', () => {
    render(<AuthenticationForm />);
    expect(screen.getByTestId('sign-in-element')).toBeInTheDocument();
  });
});