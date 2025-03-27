import { UserRole } from "./UserRole"

export interface IUserDTO {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  docNumber: number,
  phone1: string,
  phone2: string,
  role: UserRole,
  password: string,
  birthDate: string
}
