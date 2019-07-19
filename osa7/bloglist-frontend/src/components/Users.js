import React from 'react'

import { Link } from 'react-router-dom'

const Users = ({ store }) => {

  const users = store.getState().users


  const mappedUsers = users.map(user =>
    <tr key={user.name}>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link> </td>
      <td>{user.blogs.length}</td>
    </tr>
  )

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {mappedUsers}
        </tbody>
      </table>
    </div>
  )
}

export default Users