import AxiosHttpClientAdapter from '@/infra/adapters/AxiosHttpClientAdapter'
import { IAuthService } from './IAuthService'
import { IAuthDTO } from './IAuthDTO'

export class AuthService
  extends AxiosHttpClientAdapter
  implements IAuthService
{
  async login(auth: IAuthDTO): Promise<{ name: string, token: string }> {
    return super.post('/api/auth/login', auth)
  }
}