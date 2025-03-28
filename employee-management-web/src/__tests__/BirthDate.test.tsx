import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserContext } from '@/contexts/UserContext';
import { BirthDate } from '@/components/Inputs';

jest.mock('moment', () => {
  return jest.fn(() => ({
    diff: jest.fn().mockReturnValue(18)
  }));
});

describe('BirthDate component', () => {
  it('should display error if user is younger than 18 years old', async () => {
    const mockContextValue = {
      isViewMode: false,
      errors: {
        birthDate: { type: 'validate' },
      },
      register: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockContextValue}>
        <BirthDate />
      </UserContext.Provider>
    );

    const input = screen.getByLabelText('birth-date') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2005-03-27' } });

    await waitFor(() => {
      expect(screen.getByLabelText('birth-date-error-message')).toBeInTheDocument();
    });
  });

  it('should disable the input if isViewMode is true', () => {
    const mockContextValue = {
      isViewMode: true,
      errors: {},
      register: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockContextValue}>
        <BirthDate />
      </UserContext.Provider>
    );

    const input = screen.getByLabelText('birth-date') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('should allow input if not in view mode', () => {
    const mockContextValue = {
      isViewMode: false,
      errors: {},
      register: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockContextValue}>
        <BirthDate />
      </UserContext.Provider>
    );

    const input = screen.getByLabelText('birth-date') as HTMLInputElement;
    expect(input).not.toBeDisabled();
  });
});