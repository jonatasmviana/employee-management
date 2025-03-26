import { IUserDTO } from './IUserDTO'
import { UserRole } from './UserRole'

export const usersMock: IUserDTO[] = [
  {
    id: 1,
    firstName: 'User',
    lastName: 'Director',
    email: 'user@director.com',
    docNumber: '34878141026',
    phones: ['51999887766'],
    managerName: 'User Director',
    role: UserRole.Director,
    passwordHash: '',
    birthDate: '1995-01-01T00:00:00'
  },
  {
    id: 2,
    firstName: 'User',
    lastName: 'Leader',
    email: 'user@leader.com',
    docNumber: '44233279028',
    phones: ['51999887766'],
    managerName: 'User Leader',
    role: UserRole.Leader,
    passwordHash: '',
    birthDate: '1995-01-01T00:00:00'
  },
]
