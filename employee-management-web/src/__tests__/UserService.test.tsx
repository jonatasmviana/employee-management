import AxiosHttpClientAdapter from '@/infra/adapters/AxiosHttpClientAdapter';
import { UserService } from '@/infra/services/User/UserService';
import { IUserDTO } from '@/infra/services/User/IUserDTO';

jest.mock('@/infra/adapters/AxiosHttpClientAdapter');

describe('UserService', () => {
  let userService: UserService;
  let mockGet: jest.Mock;
  let mockPost: jest.Mock;
  let mockPut: jest.Mock;
  let mockDelete: jest.Mock;

  beforeEach(() => {
    mockGet = jest.fn();
    mockPost = jest.fn();
    mockPut = jest.fn();
    mockDelete = jest.fn();

    AxiosHttpClientAdapter.prototype.get = mockGet;
    AxiosHttpClientAdapter.prototype.post = mockPost;
    AxiosHttpClientAdapter.prototype.put = mockPut;
    AxiosHttpClientAdapter.prototype.delete = mockDelete;

    userService = new UserService();
  });

  it('should get user by ID', async () => {
    const mockUser: IUserDTO = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      docNumber: 123456789,
      phone1: '1234567890',
      phone2: '0987654321',
      role: 0,
      password: 'hashedpassword',
      birthDate: '2000-01-01',
    };
    mockGet.mockResolvedValue({ data: mockUser });

    const user = await userService.getUser(1);

    expect(mockGet).toHaveBeenCalledWith('/api/employee/1');
    expect(user).toEqual(mockUser);
  });

  it('should get all users', async () => {
    const mockUsers: IUserDTO[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', docNumber: 123456789, phone1: '1234567890', phone2: '0987654321', role: 0, password: 'hashedpassword', birthDate: '2000-01-01' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', docNumber: 987654321, phone1: '1122334455', phone2: '5544332211', role: 1, password: 'hashedpassword2', birthDate: '1995-06-15' },
    ];
    mockGet.mockResolvedValue({ data: mockUsers });

    const users = await userService.getAllUsers();

    expect(mockGet).toHaveBeenCalledWith('/api/employee');
    expect(users).toEqual(mockUsers);
  });

  it('should create a new user', async () => {
    const newUser: IUserDTO = {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      docNumber: 111222333,
      phone1: '555666777',
      phone2: '888999000',
      role: 2,
      password: 'hashedpassword3',
      birthDate: '1992-03-10',
    };

    await userService.createUser(newUser);

    expect(mockPost).toHaveBeenCalledWith('/api/employee', newUser);
  });

  it('should update a user', async () => {
    const updatedUser: IUserDTO = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.updated@example.com',
      docNumber: 123456789,
      phone1: '1234567890',
      phone2: '0987654321',
      role: 0,
      password: 'newhashedpassword',
      birthDate: '2000-01-01',
    };

    await userService.updateUser(updatedUser);

    expect(mockPut).toHaveBeenCalledWith('/api/employee/1', updatedUser);
  });

  it('should delete a user', async () => {
    await userService.deleteUser(1);

    expect(mockDelete).toHaveBeenCalledWith('/api/employee/1');
  });
});
