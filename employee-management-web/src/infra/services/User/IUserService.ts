import { IUserDTO } from './IUserDTO'

export interface IUserService {
  getUser: (id: number) => Promise<IUserDTO>
  getAllUsers: () => Promise<IUserDTO[]>
  createUser: () => Promise<void>
  updateUser: (user: IUserDTO) => Promise<IUserDTO>
  deleteUser: (id: number) => Promise<void>
}
