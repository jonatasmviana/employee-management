import { UserRole } from "./UserRole"

export interface IUserDTO {
  id: number
  firstName: string,
  lastName: string,
  email: string,
  docNumber: string,
  phones: string[],
  managerName: string,
  role: UserRole,
  passwordHash: string,
  birthDate: string
}
