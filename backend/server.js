const express = require('express')
const port = process.env.PORT || 5000
const dotenv = require('dotenv').config()
const connectDB = require('./db/connectDB')
const { errorHandler } = require('./middleware/errorMiddleware')
const path = require('path')


connectDB()

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/wish', require('./routes/wishRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`Server is listening on port ${port}`))