import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Users = ({ store }) => {

  const users = store.getState().users

  const mappedUsers = users.map(user =>
    <Table.Row key={user.name}>
      <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
      <Table.Cell>{user.blogs.length}</Table.Cell>
    </Table.Row>
  )

  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>name</Table.Cell>
            <Table.Cell>blogs created</Table.Cell>
          </Table.Row>
          {mappedUsers}
        </Table.Body>
      </Table>
    </div>
  )


/*
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
  */
}

export default Users