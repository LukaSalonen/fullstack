const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://luksi:juhannusitikka@cluster0-y9qxp.mongodb.net/library-application?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    bookCount: Int!
    authorCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => {
      return Book.collection.countDocuments()
    },
    authorCount: () => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {

      const filterGenre = (books, genre) => {
        return books.filter(book => book.genres.includes(genre))
      }
      const filterAuthor = (books, author) => {
        return books.filter(book => book.author.toString() === author.id.toString())
      }
      const foundBooks = await Book.find({})
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author })
        if (!foundAuthor) return []
        if (args.genre) {
          return filterGenre(filterAuthor(foundBooks, foundAuthor), args.genre)
        }
        return filterAuthor(foundBooks, foundAuthor)
      }
      if (args.genre) {
        return filterGenre(foundBooks, args.genre)
      }
      else {
        return foundBooks
      }
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({name: root.name})
      const books = await Book.find({})
      return books.filter(book => book.author.toString() === author.id.toString()).length
    }
  },
  Book: {
    author: async (root) => {
      const auth = await Author.findById(root.author)
      return {
        name: auth.name,
        born: auth.born,
        id: auth.id
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, born: null })
        await author.save()
      }
      const newBook = new Book({ ...args, author: author })
      try {
        await newBook.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook
      
    },
    editAuthor: (root, args) => {
      // TODO: dosen't work with mongoDB yet
      if (authors.includes(el => el.name === args.name)) {
        return null
      }
      else {
        const changedAuthor = authors.find(author => author.name === args.name)
        changedAuthor.born = args.setBornTo
        authors = authors.filter(author => author.name !== changedAuthor.name).concat(changedAuthor)
        return changedAuthor
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})