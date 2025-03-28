import { renderHook, waitFor, act } from '@testing-library/react'
import { useListUsers } from '@/hooks/useListUsers'
import { UserService } from '@/infra/services/User/UserService'
import { mockUsers } from '@/infra/services/User/UsersMock'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

jest.mock('@/infra/services/User/UserService')

describe('useListUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'token') return 'fake-token'
      return null
    });

    (UserService as jest.Mock).mockImplementation(() => ({
      getAllUsers: jest.fn().mockResolvedValue(mockUsers),
      deleteUser: jest.fn().mockResolvedValue(true)
    }))
  })

  it('should redirect to login if no token', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(null)
    renderHook(() => useListUsers())
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('should fetch users when token exists', async () => {
    const { result } = renderHook(() => useListUsers())

    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers)
    })
  })

  it('should handle delete error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (UserService as jest.Mock).mockImplementationOnce(() => ({
      getAllUsers: jest.fn().mockResolvedValue([...mockUsers]),
      deleteUser: jest.fn().mockRejectedValue(new Error('Delete failed'))
    }))

    const { result } = renderHook(() => useListUsers())

    await waitFor(() => {
      expect(result.current.users).toHaveLength(3)
    })

    await act(async () => {
      await result.current.deleteUser(1)
    })

    expect(consoleSpy).toHaveBeenCalledWith('Erro ao deletar usuário:', expect.any(Error))
    expect(result.current.users).toHaveLength(3)

    consoleSpy.mockRestore()
  })
})