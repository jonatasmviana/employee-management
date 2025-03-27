'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from "react-hook-form";
import { useUser } from '@/hooks/useUser'
import { IUserDTO } from '@/infra/services/User/IUserDTO';
import { UserService } from '@/infra/services/User/UserService';
import { IUserService } from '@/infra/services/User/IUserService';
import { UserContextProvider } from '@/contexts/UserContext';
import {
  FirstName,
  LastName,
  Email,
  Password,
  DocNumber,
  PhoneNumber,
  Role,
  BirthDate
} from '@/components/Inputs'

export default function User() {
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const searchParams = useSearchParams()
  const mode = searchParams?.get('mode')
  const userIdToDetail = searchParams?.get('id')

  const { user, loading, error } = useUser(userIdToDetail ? Number(userIdToDetail) : null)
  const loggedUser = useUser(loggedUserId)

  const roleRule = (loggedUser.user?.role ?? Infinity) < (user?.role ?? Infinity)
  const creatingNewUser = !userIdToDetail && !user
  const isViewMode = mode === 'view' || roleRule
  const isEditMode = !!userIdToDetail && !isViewMode

  useEffect(() => {
    const storedId = localStorage.getItem('id')
    if (storedId)
      setLoggedUserId(Number(storedId))
  }, [])

  const handleGoBack = () => { router.push('/users')}

  const onSubmit = async (data: IUserDTO) => {
    const userService: IUserService = new UserService()

    try {
      const userFormatted = {
        ...data,
        role: Number(data.role),
        docNumber: Number(data.docNumber),
        birthDate: data.birthDate ? data.birthDate : null
      }

      await creatingNewUser
        ? userService.createUser(userFormatted)
        : userService.updateUser(userFormatted)

      router.push('/users')
    } catch (error) {
      const err = error as Error
      setErrorMessage(err.message || 'Failed to create user')
    }
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserDTO>();

  useEffect(() => {
    if (user) reset({ ...user, password: '' })
  }, [user, reset]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while loading user: {error}</div>;

  return (
    <div className="w-full bg-white px-5 py-8 rounded-lg shadow-dark-sm">
      <UserContextProvider
        errors={errors}
        register={register}
        isViewMode={isViewMode && !creatingNewUser}
      >
        <FirstName />
        <LastName />
        <Email />
        <Password isLoginOrCreatingNewUser={creatingNewUser} />
        <DocNumber />
        <PhoneNumber phoneType={1} />
        <PhoneNumber phoneType={2} />
        <Role />
        <BirthDate />
      </UserContextProvider>

      <div className='flex justify-between mt-5'>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleGoBack}>
          Back
        </button>
        {(creatingNewUser || isEditMode) && roleRule && (
          <button
            aria-label="create-update-user-button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => handleSubmit(onSubmit)()}
          >
            {isEditMode ? 'Update user' : 'Create user'}
          </button>
        )}
      </div>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  )
}
