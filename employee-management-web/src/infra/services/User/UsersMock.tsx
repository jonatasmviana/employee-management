import { IUserDTO } from './IUserDTO'
import { UserRole } from './UserRole'

export const usersMock: IUserDTO[] = [
  {
    id: 1,
    firstName: 'User',
    lastName: 'Director',
    email: 'user@director.com',
    docNumber: 34878141026,
    phone1: '51999887766',
    phone2: '51999887766',
    role: UserRole.Director,
    password: '',
    birthDate: '1995-01-01T00:00:00'
  },
  {
    id: 2,
    firstName: 'User',
    lastName: 'Leader',
    email: 'user@leader.com',
    docNumber: 44233279028,
    phone1: '51999887766',
    phone2: '51999887766',
    role: UserRole.Leader,
    password: '',
    birthDate: '1995-01-01T00:00:00'
  },
]
