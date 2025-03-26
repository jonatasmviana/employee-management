import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { IHttpClient } from '../IHttpClient'

export default class AxiosHttpClientAdapter implements IHttpClient {
  private API: Axios

  constructor() {
    this.API = axios.create({
      baseURL: 'http://localhost:5000',
    })
  }

  async get(url: string, params = {}, headers = {}) {
    const token = localStorage.getItem('token')
    if (!token)
      throw new Error('No token found')

    let axiosResponse: AxiosResponse

    const header = { ...headers, Authorization: `Bearer ${token}`, }

    try {
      axiosResponse = await this.API.get(url, { params, headers: header })
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse.status,
      data: axiosResponse.data,
    }
  }

  async post<T>(url: string, data: T) {
    try {
      const result = await this.API.post(url, data)
      return result.data
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }
  }

  async put<T>(url: string, data: T) {
    try {
      const result = await this.API.put(url, data)
      return result.data
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }
  }
}
