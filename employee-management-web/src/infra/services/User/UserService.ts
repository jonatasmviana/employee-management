import AxiosHttpClientAdapter from '@/infra/adapters/AxiosHttpClientAdapter'
import { IUserService } from './IUserService'
import { IUserDTO } from './IUserDTO'
import { usersMock } from './UsersMock'

export class UserService
  extends AxiosHttpClientAdapter
  implements IUserService
{
  async getUser(id: number): Promise<IUserDTO> {
    const response = await super.get(`/api/employee/${id}`);
    return response.data as IUserDTO;
  }

  async getAllUsers(): Promise<IUserDTO[]> {
    const response = await super.get('/api/employee');
    return response.data as IUserDTO[];
  }

  async createUser(): Promise<void> {
    return new Promise((resolve) => resolve())
    // return super.post('/api/employee')
  }

  async updateUser(user: IUserDTO): Promise<IUserDTO> {
    console.log(user)
    return new Promise((resolve) => resolve(usersMock[0]))
    // return super.put('/api/employee')
  }

  async deleteUser(id: number): Promise<void> {
    console.log(id)
    return new Promise((resolve) => resolve())
    // return super.delete('/api/employee')
  }
}
