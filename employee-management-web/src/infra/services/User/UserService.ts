import AxiosHttpClientAdapter from '@/infra/adapters/AxiosHttpClientAdapter'
import { IUserService } from './IUserService'
import { IUserDTO } from './IUserDTO'

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

  async createUser(user: IUserDTO): Promise<void> {
    return super.post('/api/employee', user)
  }

  async updateUser(user: IUserDTO): Promise<void> {
    return super.put(`/api/employee/${user.id}`, user)
  }

  async deleteUser(id: number): Promise<void> {
    return super.delete(`/api/employee/${id}`)
  }
}
