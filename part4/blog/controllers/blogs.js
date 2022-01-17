/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {

  const blogObject = {
    comments: request.body.comments,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogObject,
    { new: true }
  ).populate('user', { username: 1, name: 1 })

  response.json(updatedBlog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate()

  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  // const blog = await Blog.findById(request.params.id)
  // const likes = blog.likes + 1
  const newBlogLikes = {
    likes: request.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlogLikes, { new: true }).populate('user', { username: 1, name: 1 })

  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter