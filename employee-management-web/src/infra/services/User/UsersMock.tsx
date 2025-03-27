import { IUserDTO } from './IUserDTO'
import { UserRole } from './UserRole'

export const mockUsers: IUserDTO[] = [
  {
    id: 1,
    firstName: 'Joao',
    lastName: 'Silva',
    role: UserRole.Employee,
    email: 'joao.silva@example.com',
    docNumber: 61431620009,
    phone1: '12345678901',
    phone2: '',
    password: '',
    birthDate: null,
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Souza',
    role: UserRole.Leader,
    email: 'maria.souza@example.com',
    docNumber: 66174349004,
    phone1: '32165409871',
    phone2: '',
    password: '',
    birthDate: null,
  },
  {
    id: 3,
    firstName: 'Admin',
    lastName: 'Santos',
    role: UserRole.Director,
    email: 'admin.santos@example.com',
    docNumber: 44233279028,
    phone1: '32165409871',
    phone2: '',
    password: '',
    birthDate: null,
  },
];