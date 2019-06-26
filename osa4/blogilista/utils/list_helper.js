const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    else {
        return blogs.map(blog => blog.likes).reduce( (sum, num) => sum + num)
    }   
}

const favoriteBlog = (blogs) => {
    const stripBlog = (blog) => {
       return {
           title: blog.title,
           author: blog.author,
           likes: blog.likes
       }
    }

    if (blogs.length === 0) {
        return undefined
    } else if (blogs.length === 1) {
        return stripBlog(blogs[0])
    } else {
        let current = blogs[0]
        blogs.forEach(blog => {
          if (blog.likes > current.likes) current = blog
        })

        return stripBlog(current)
    }
}

const mostBlogs = (blogs) => {
    const lodash = require('lodash')

    if (blogs.length === 0) return undefined
    else {
        const grouped = lodash.groupBy(blogs, 'author')

        let current = {
            author: '',
            blogs: 0
        }
        
        Object.keys(grouped).forEach(a => {
            if (grouped[a].length > current.blogs) {
                current = {
                    author: a,
                    blogs: grouped[a].length
                }
            }
        })

        return current
    }

}

const mostLikes = (blogs) => {
    const lodash = require('lodash')

    if (blogs.length === 0) return undefined
    else {
        const grouped = lodash.groupBy(blogs, 'author')

        const results = Object.keys(grouped).map(writer => {
            return {
                author: writer,
                likes: lodash.sum(grouped[writer].map(blog => blog.likes))
            }
        })

        return lodash.maxBy(results, 'likes')
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }