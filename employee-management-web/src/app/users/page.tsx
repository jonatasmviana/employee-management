'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useListUsers } from '@/hooks/useListUsers'
import { useUser } from '@/hooks/useUser'
import Action from '@/components/Actions/Action'

export default function ListUsers() {
  const [id, setId] = useState<number | null>(null);
  const router = useRouter()
  const { user } = useUser(id)
  const { users, deleteUser } = useListUsers()

  useEffect(() => {
    const storedId = localStorage.getItem('id')
    if (storedId)
      setId(Number(storedId))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    router.push('/login')
  }

  const handleDelete = async (id?: number) => {
    if (!id) {
      console.error('Cannot delete user!');
      return;
    }

    await deleteUser(id);
  };

  const redirectToNewUser = () => router.push('/user')
  const redirectToViewUser = (id: number) => router.push(`/user?id=${id}&mode=view`)
  const redirectToEditUser = (id: number) => router.push(`/user?id=${id}`)

  return (
    <div className="border-2 border-white px-10 py-8 transition-all w-11/12 md:w-4/5 lg:w-3/5 2xl:w-2/5">
      <div className='flex flex-row justify-between items-center'>
        {user && (<div>You are loged in with {user.firstName} user</div>)}
        <Action
          iconClass="fas fa-arrow-right-from-bracket"
          buttonClass="w-40 py-2 px-3 mb-5"
          buttonTitle='Logout'
          handleOnClick={handleLogout}
        />
      </div>

      <div className="w-full bg-white px-5 py-8 rounded-lg shadow-dark-sm">
        <div className='flex justify-between items-baseline mb-5'>
          <div>List of users</div>
          <Action
            iconClass="fas fa-plus"
            buttonClass="py-2 px-3"
            buttonTitle='Create new user'
            handleOnClick={redirectToNewUser}
          />
        </div>

        {users.map((userList, index) => {
          return (
            <div key={index} className="flex justify-between items-center my-1">
              <input
                type="text"
                value={userList.firstName + ' ' + userList.lastName}
                disabled
                className="default-input w-full px-3 py-1.5 mr-1"
              />
              <div className="flex justify-between">
                <Action
                  iconClass="fas fa-magnifying-glass"
                  buttonClass="mr-1"
                  handleOnClick={() => redirectToViewUser(userList.id)}
                />
                <Action
                  disabled={(user?.role ?? 0) < userList.role}
                  iconClass="fas fa-pencil"
                  buttonClass="mr-1"
                  handleOnClick={() => redirectToEditUser(userList.id)}
                />
                <Action
                  disabled={(user?.role ?? 0) < userList.role || userList?.id === user?.id}
                  ariaLabel={`delete-button-${userList.id}`}
                  iconClass="far fa-trash-alt"
                  handleOnClick={() => handleDelete(userList?.id)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}