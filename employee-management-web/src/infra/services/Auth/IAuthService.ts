import { IAuthDTO } from './IAuthDTO'

export interface IAuthService {
  login: (auth: IAuthDTO) => Promise<{ name: string, token: string }>
}
