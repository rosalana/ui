import { UseFetchOptions } from './types'
import axios from 'axios'

export async function useFetch(url: string, options: UseFetchOptions = {}) {
  const http = instance
  const method = (options.method ?? 'GET').toLowerCase() as 'get' | 'post' | 'put' | 'delete'

  const config = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    withCredentials: true,
  }

  try {
    const response = await http.request({
      url,
      method,
      data: options.body ?? undefined,
      ...config,
    })

    console.log('🎁 Axios/Inertia response payload:', response.data)

    return response.data
  } catch (error: any) {
    // Axios chyby mají response v error.response
    if (error.response) {
      throw new Error(`HTTP error! status: ${error.response.status}`)
    }

    throw error
  }
}

const instance = axios.create({
  baseURL: '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  withCredentials: true,
});