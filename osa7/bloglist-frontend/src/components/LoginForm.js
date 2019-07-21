import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ username, password, handleLogin }) => {

  return (
    <Form onSubmit={handleLogin}>
      <Form.Field>
        <label>username</label>
        <input {...username} reset='' />
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <input {...password} reset='' />
      </Form.Field>
      <Button type='submit'>login</Button>
    </Form>
  )
}

export default LoginForm