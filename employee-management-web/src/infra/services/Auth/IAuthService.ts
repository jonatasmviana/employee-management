import { IUserDTO } from '../User/IUserDTO'

export interface IAuthService {
  login: (auth: Pick<IUserDTO, 'email' | 'password'>) => Promise<{ id: number, token: string }>
}
