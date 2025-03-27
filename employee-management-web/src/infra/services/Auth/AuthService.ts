import AxiosHttpClientAdapter from '@/infra/adapters/AxiosHttpClientAdapter'
import { IAuthService } from './IAuthService'
import { IUserDTO } from '../User/IUserDTO'

export class AuthService
  extends AxiosHttpClientAdapter
  implements IAuthService
{
  async login(auth: Pick<IUserDTO, 'email' | 'password'>): Promise<{ id: number, token: string }> {
    return super.post('/api/auth/login', auth)
  }
}