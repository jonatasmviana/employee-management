import axios, { Axios, AxiosError, AxiosResponse } from 'axios'

export default class AxiosHttpClientAdapter {
  private API: Axios

  constructor() {
    this.API = axios.create({
      baseURL: 'http://localhost:5000',
    })

    this.API.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
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

  async delete(url: string) {
    try {
      const result = await this.API.delete(url)
      return result.data
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }
  }
}
