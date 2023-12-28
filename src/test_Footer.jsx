import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer text', () => {
  render(<Footer />);
  const footerText = screen.getByText(/© \d{4} footer/i);
  expect(footerText).toBeInTheDocument();
});
