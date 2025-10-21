import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders hero heading', () => {
    render(<HomePage />);
    expect(screen.getByText(/Stop Fighting Fires/i)).toBeInTheDocument();
  });
});
