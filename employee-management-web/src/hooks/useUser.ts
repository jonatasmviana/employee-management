'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IUserDTO } from '@/infra/services/User/IUserDTO'
import { IUserService } from '@/infra/services/User/IUserService'
import { UserService } from '@/infra/services/User/UserService'

export const useUser = (id?: number | null) => {
  const router = useRouter()
  const [user, setUser] = useState<IUserDTO | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const userService: IUserService = useMemo(() => new UserService(), [])

  const getUser = useCallback(async () => {
    if (!id) return;
    const response = await userService.getUser(id)
    const formattedUser = {
      ...response,
      birthDate: response.birthDate ? response.birthDate.split('T')[0] : null
    };
    setUser(formattedUser)
  }, [userService, id])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    if (id) {
      const fetchUser = async () => {
        setLoading(true)

        try {
          await getUser()
        } catch (err) {

          setError((err as Error).message || 'Failed to fetch user')
          router.push('/users')

        } finally {
          setLoading(false)
        }
      }

      fetchUser()

    } else {
      setUser(null)
    }
  }, [id, router, getUser]);

  return {
    user,
    error,
    loading,
  }
}
