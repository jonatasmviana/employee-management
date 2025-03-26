import { IUserDTO } from "./services/User/IUserDTO"

export interface IHttpClient {
  get: (url: string, params: any, headers: any) => Promise<any>
  put: (url: string, data: IUserDTO[]) => Promise<any>
}
