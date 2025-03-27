import { render, screen } from '@testing-library/react';
import ListUsersPage from '../users/page';

jest.mock('@/pages/ListUsers/ListUsers', () => {
  return jest.fn(() => <div>List of users</div>);
});

describe('ListUsersPage', () => {
  it('should render ListUsers component', () => {
    render(<ListUsersPage />);
    expect(screen.getByText('List of users')).toBeInTheDocument();
  });

  it('should render the main container', () => {
    render(<ListUsersPage />);
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('border-2 border-white px-10 py-8 transition-all w-11/12 md:w-4/5 lg:w-3/5 2xl:w-2/5');
  });
});