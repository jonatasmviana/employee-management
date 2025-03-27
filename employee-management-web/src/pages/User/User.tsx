'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from "react-hook-form";
import { useUser } from '@/hooks/useUser'
import { IUserDTO } from '@/infra/services/User/IUserDTO';
import { UserService } from '@/infra/services/User/UserService';
import { IUserService } from '@/infra/services/User/IUserService';
import { FirstName } from '@/components/Inputs/FirstName';
import { LastName } from '@/components/Inputs/LastName';
import { UserContextProvider } from '@/contexts/UserContext';
import { Email } from '@/components/Inputs/Email';
import { Password } from '@/components/Inputs/Password';
import { DocNumber } from '@/components/Inputs/DocNumber';
import { PhoneNumber } from '@/components/Inputs/PhoneNumber';
import { Role } from '@/components/Inputs/Role';
import { BirthDate } from '@/components/Inputs/BirthDate';

export default function User() {
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const searchParams = useSearchParams()
  const mode = searchParams?.get('mode')
  const userIdToDetail = searchParams?.get('id')

  const { user, loading, error } = useUser(userIdToDetail ? Number(userIdToDetail) : null)
  const loggedUser = useUser(loggedUserId)

  const isViewMode = mode === 'view' || (loggedUser.user?.role ?? Infinity) < (user?.role ?? Infinity)
  const isEditMode = userIdToDetail && !isViewMode

  useEffect(() => {
    const storedId = localStorage.getItem('id')
    if (storedId)
      setLoggedUserId(Number(storedId))
  }, [])

  const handleGoBack = () => { router.push('/users')}

  const onSubmit = async (data: IUserDTO) => {
    const userService: IUserService = new UserService()

    try {
      await userService.createUser(data)
      router.push('/users')
    } catch (error) {
      const err = error as Error
      setErrorMessage(err.message || 'Failed to create user')
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserDTO>();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while loading user: {error}</div>;

  return (
    <div className="w-full bg-white px-5 py-8 rounded-lg shadow-dark-sm">
      <UserContextProvider
        errors={errors}
        register={register}
        isViewMode={isViewMode}
      >
        <FirstName firstName={user?.firstName} />
        <LastName lastName={user?.lastName} />
        <Email email={user?.email} />
        <Password />
        <DocNumber docNumber={user?.docNumber} />
        <PhoneNumber phoneType={1} phoneNumber={user?.phone1} />
        <PhoneNumber phoneType={2} phoneNumber={user?.phone2} />
        <Role role={user?.role} />
        <BirthDate birthDate={user?.birthDate} />
      </UserContextProvider>

      <div className='flex justify-between mt-5'>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleGoBack}>
          Back
        </button>
        {!isViewMode && (
          <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit(onSubmit)()}>
            {isEditMode ? 'Update user' : 'Create user'}
          </button>
        )}
      </div>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  )
}
