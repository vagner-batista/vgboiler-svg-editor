//__tests__/index.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
    const heading = screen.getByTestId('titulo');
    expect(heading).toBeInTheDocument();
  });
});
