
const blogs = [
  {
    title: 'Paten suuri seikkailu',
    author: 'Pate PAterson',
    url: 'NA',
    likes: 20,
    user: {
      username: 'SaLu',
      name: 'Sami Luggerson',
      id: '5d1611900540b4706fb9bdc4'
    },
    id: '5d161209ba266871979105b8'
  },
  {
    title: 'paivaa',
    author: 'tiistai',
    url: 'makuista',
    likes: 0,
    user: {
      username: 'Harru Pottur',
      name: 'Harru Potturs cousin',
      id: '5d18d891d98d3e12a69aaf8b'
    },
    id: '5d1c84d56fb69834ad79dc2e'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}
const setToken = () => {
}

export default { getAll, setToken }