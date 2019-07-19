import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      user: '123esfasfiawdjals',
      title: 'Generic blog',
      author: 'Regualr author',
      url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
      likes: 66
    }
    const user = {
      name: 'McDude',
      username: 'McDudeAlso'
    }


    component = render(
      <Blog blog={blog} logIn={user} updateBlogs={() => console.log('updated blogs')} />
    )
  })

  test('renders small form blog', () => {
    component.container.querySelector('.blog')
  })

  test('at start the big form blog is not displayed', () => {
    expect(component.container).not.toHaveTextContent('https://fullstackopen.com/osa5/react_sovellusten_testaaminen')
    expect(component.container).not.toHaveTextContent('66 likes')
  })

  test('after clicking the button, big form blog is displayed and small one is not', () => {
    let blog = component.container.querySelector('.blog')
    fireEvent.click(blog)

    blog = component.container.querySelector('.blog')
    expect(component.container).toHaveTextContent('https://fullstackopen.com/osa5/react_sovellusten_testaaminen')
    expect(component.container).toHaveTextContent('66 likes')
  })

})
