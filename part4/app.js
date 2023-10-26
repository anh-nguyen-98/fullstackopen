const { MONGO_URL } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(MONGO_URL)
    .then(result => console.log('connected to MongoDB'))
    .catch((error) => console.log('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app