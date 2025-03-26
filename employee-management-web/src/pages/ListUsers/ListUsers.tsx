'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Action from '@/components/Actions/Action'
import { useListUsers } from '@/hooks/useListUsers'

export default function ListUsers() {
  const router = useRouter()
  const userName = localStorage.getItem('name')
  const { users } = useListUsers()

  const handleLogout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    router.push('/login')
  }

  const redirectToNewUser = () => router.push('/user')
  const redirectToViewUser = (id: number) => router.push(`/user?id=${id}&mode=view`)
  const redirectToEditUser = (id: number) => router.push(`/user?id=${id}`)

  return (
    <>
      <div className='flex flex-row justify-between items-center'>
        {userName && (<div>You are loged in with {userName} user</div>)}
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

        {users.map((user, index) => {
          return (
            <div key={index} className="flex justify-between items-center my-1">
              <input
                type="text"
                value={user.firstName + ' ' + user.lastName}
                disabled
                className="default-input w-full px-3 py-1.5 mr-1"
              />
              <div className="flex justify-between">
                <Action
                  iconClass="fas fa-magnifying-glass"
                  buttonClass="mr-1"
                  handleOnClick={() => redirectToViewUser(user.id)}
                  />
                <Action
                  iconClass="fas fa-pencil"
                  buttonClass="mr-1"
                  handleOnClick={() => redirectToEditUser(user.id)}
                  />
                <Action
                  iconClass="far fa-trash-alt"
                  handleOnClick={() => null}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
