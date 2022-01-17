const mongoose = require('mongoose')
const config = require('../utils/config')

const url = config.MONGODB_URI

console.log('connecting to', url)

const run = async () => {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  console.log('connected to MongoDB')
}

run().catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: {
    type: [{ type: String }],
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
