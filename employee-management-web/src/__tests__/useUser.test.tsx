import { renderHook, waitFor } from '@testing-library/react'
import { useUser } from '@/hooks/useUser'
import { UserService } from '@/infra/services/User/UserService'
import { mockUsers } from '@/infra/services/User/UsersMock'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

jest.mock('@/infra/services/User/UserService')

const mockUser = mockUsers[0];

describe('useUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    Storage.prototype.getItem = jest.fn((key) => key === 'token' ? 'fake-token' : null);

    (UserService as jest.Mock).mockImplementation(() => ({
      getUser: jest.fn().mockResolvedValue(mockUser)
    }))
  })

  it('should redirect to login if no token', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(null)
    const { result } = renderHook(() => useUser(1))

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })

  it('should fetch user when id is provided', async () => {
    const { result } = renderHook(() => useUser(1))
    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.error).toBeNull()
    })
  })

  it('should not fetch user when id is not provided', async () => {
    const { result } = renderHook(() => useUser(null))

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })

  it('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch user';
    (UserService as jest.Mock).mockImplementationOnce(() => ({
      getUser: jest.fn().mockRejectedValue(new Error(errorMessage))
    }))

    const { result } = renderHook(() => useUser(1))

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage)
      expect(result.current.user).toBeNull()
    })
  })

  it('should format birthDate correctly', async () => {
    const userWithBirthDate = {
      ...mockUser,
      birthDate: '1985-05-15T00:00:00.000Z'
    };

    (UserService as jest.Mock).mockImplementationOnce(() => ({
      getUser: jest.fn().mockResolvedValue(userWithBirthDate)
    }))

    const { result } = renderHook(() => useUser(1))

    await waitFor(() => {
      expect(result.current.user?.birthDate).toBe('1985-05-15')
    })
  })

  it('should handle null birthDate', async () => {
    const userWithoutBirthDate = {
      ...mockUser,
      birthDate: null
    };

    (UserService as jest.Mock).mockImplementationOnce(() => ({
      getUser: jest.fn().mockResolvedValue(userWithoutBirthDate)
    }))

    const { result } = renderHook(() => useUser(1))

    await waitFor(() => {
      expect(result.current.user?.birthDate).toBeNull()
    })
  })
})