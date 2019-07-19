import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const testBlog = {
    title: 'Greatest title in the world',
    author: 'James Jackson',
    likes: 56
  }
  const mockHandler = jest.fn()
  const component = render(
    <SimpleBlog blog={ testBlog } onClick={ mockHandler } />
  )

  expect(component.container).toHaveTextContent(
    'Greatest title in the world'
  )
  expect(component.container).toHaveTextContent(
    'blog has 56 likes'
  )
  expect(component.container).toHaveTextContent(
    'James Jackson'
  )
})

test('like button works', () => {
  const testBlog = {
    title: 'Greatest title in the world',
    author: 'James Jackson',
    likes: 56
  }

  const mockHandler = jest.fn()
  const component = render(
    <SimpleBlog blog={ testBlog } onClick={ mockHandler } />
  )

  const likeButton = component.container.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(2)
})

