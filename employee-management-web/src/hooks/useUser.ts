'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IUserDTO } from '@/infra/services/User/IUserDTO'
import { IUserService } from '@/infra/services/User/IUserService'
import { UserService } from '@/infra/services/User/UserService'

export const useUser = (id: number) => {
  const [user, setUser] = useState<IUserDTO>()
  const userService: IUserService = useMemo(() => new UserService(), [])

  const getUser = useCallback(async () => {
    const response = await userService.getUser(id)
    setUser(response)
  }, [userService, id])

  useEffect(() => {
    const fetchUser = async () => {
      await getUser()
    }
    fetchUser()
  }, [getUser])

  return {
    user,
  }
}
