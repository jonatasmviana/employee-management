'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IUserDTO } from '@/infra/services/User/IUserDTO'
import { IUserService } from '@/infra/services/User/IUserService'
import { UserService } from '@/infra/services/User/UserService'

export const useListUsers = () => {
  const router = useRouter()
  const [users, setUsers] = useState<IUserDTO[]>([])
  const userService: IUserService = useMemo(() => new UserService(), [])

  const getUsers = useCallback(async () => {
    const response = await userService.getAllUsers()
    setUsers(response)
  }, [userService])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUsers = async () => {
      await getUsers()
    }
    fetchUsers()
  }, [getUsers, router])

  return {
    users,
  }
}
