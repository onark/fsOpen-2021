/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesTotal = blogs.reduce((prev, cur) => prev + cur.likes, 0)

  return likesTotal
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, cur) => prev.likes < cur.likes ? cur : prev, blogs[0])
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}