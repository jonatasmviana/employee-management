import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useListUsers } from '@/hooks/useListUsers';
import ListUsers from '@/pages/ListUsers/ListUsers';
import { UserRole } from '@/infra/services/User/UserRole';
import { useUser } from '@/hooks/useUser';
import { mockUsers } from '@/infra/services/User/UsersMock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useListUsers', () => ({
  useListUsers: jest.fn(),
}));

jest.mock('@/hooks/useUser', () => ({
  useUser: jest.fn(),
}));

describe('ListUsers Component', () => {
  const mockDeleteUser = jest.fn();
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (useListUsers as jest.Mock).mockImplementation(() => ({
      users: mockUsers,
      deleteUser: mockDeleteUser,
    }));

    (useUser as jest.Mock).mockImplementation(() => ({
      user: { id: 3, role: UserRole.Director }
    }));

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'token') return 'fake-token';
      if (key === 'id') return '1';
      return null;
    });
  });

  it('should render the user list correctly', () => {
    render(<ListUsers />);
    expect(screen.getByDisplayValue('Joao Silva')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Maria Souza')).toBeInTheDocument();
  });

  it('should call deleteUser when trash button is clicked', async () => {
    (useUser as jest.Mock).mockImplementation(() => ({
      user: {
        id: 3,
        role: UserRole.Director,
        firstName: 'Admin'
      }
    }));

    render(<ListUsers />);

    const deleteButton = screen.getByRole('button', { name: 'delete-button-1' });
    expect(deleteButton).not.toBeDisabled();
    await userEvent.click(deleteButton);
    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith(1);
    });
  });

  it('should disable delete button when user cannot delete', () => {
    (useUser as jest.Mock).mockImplementation(() => ({
      user: {
        id: 1,
        role: UserRole.Employee,
        firstName: 'Joao'
      }
    }));

    render(<ListUsers />);

    const deleteButton1 = screen.getByRole('button', { name: 'delete-button-1' });
    expect(deleteButton1).toBeDisabled();

    const deleteButton2 = screen.getByRole('button', { name: 'delete-button-2' });
    expect(deleteButton2).toBeDisabled();
  });

  it('should redirect to view user when magnifying glass is clicked', () => {
    render(<ListUsers />);
    const viewButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(viewButtons[0]);
    expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining('mode=view'));
  });

  it('should redirect to edit user when pencil is clicked', () => {
    render(<ListUsers />);
    const editButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(editButtons[1]);
    expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining('/user?id='));
  });

  it('should disable edit and delete buttons based on user role', () => {
    (useUser as jest.Mock).mockImplementation(() => ({
      user: {
        id: 1,
        role: UserRole.Employee,
        firstName: 'Joao'
      }
    }));

    render(<ListUsers />);
    const editButtons = screen.getAllByRole('button', { name: '' });
    const deleteButtons = screen.getAllByRole('button', { name: /delete-button/ });

    expect(editButtons[3]).toBeDisabled();
    expect(deleteButtons[1]).toBeDisabled();
  });

  it('should show logged in user message when user exists', () => {
    render(<ListUsers />);
    expect(screen.getByText(/You are loged in with/)).toBeInTheDocument();
  });

  it('should disable delete button for current user', () => {
    (useUser as jest.Mock).mockImplementation(() => ({
      user: {
        id: 1,
        role: UserRole.Employee,
        firstName: 'Joao'
      }
    }));

    render(<ListUsers />);
    const deleteButtons = screen.getAllByRole('button', { name: /delete-button/ });
    expect(deleteButtons[0]).toBeDisabled();
  });
});