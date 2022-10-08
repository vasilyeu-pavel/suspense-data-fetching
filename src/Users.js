import React, { useEffect, memo } from 'react'
import { getUsers } from "./resource"

const usersResource = getUsers()

export const Users = () => {
  const users = usersResource.read()

  useEffect(() => {
    console.log("useEffect Users")
  }, [])

  console.log("render", users)

  return (
    <>
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}

export default memo(Users)
