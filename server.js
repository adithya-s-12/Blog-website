const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const db = require('./config/db')

//env config
dotenv.config()

const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

db.connect();

//rest object
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use(userRoutes);
app.use(blogRoutes);

const PORT = process.env.PORT || 3100
//listen
app.listen(3100, () => {
    console.log(`server running on port ${PORT}`);
});