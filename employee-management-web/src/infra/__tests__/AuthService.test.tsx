import AxiosHttpClientAdapter from '@/infra/adapters/AxiosHttpClientAdapter';
import { AuthService } from '../services/Auth/AuthService';

jest.mock('@/infra/adapters/AxiosHttpClientAdapter');

describe('AuthService', () => {
  let authService: AuthService;
  let mockPost: jest.Mock;

  beforeEach(() => {
    mockPost = jest.fn();
    AxiosHttpClientAdapter.prototype.post = mockPost;
    authService = new AuthService();
  });

  it('should call post method with proper credentials and retorn id and token', async () => {
    const mockResponse = { id: 1, token: 'fake-token' };
    mockPost.mockResolvedValue(mockResponse);

    const result = await authService.login({ email: 'test@example.com', password: 'password123' });

    expect(mockPost).toHaveBeenCalledWith('/api/auth/login', { email: 'test@example.com', password: 'password123' });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when login fail', async () => {
    mockPost.mockRejectedValue(new Error('Login failed'));

    await expect(authService.login({ email: 'test@example.com', password: 'wrongpassword' }))
      .rejects.toThrow('Login failed');
  });
});
