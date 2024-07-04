const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const db = require('./config/db')
const bodyParser = require("body-parser");


//env config
dotenv.config()

// const userRoutes = require('./routes/userRoutes')
// const blogRoutes = require('./routes/blogRoutes')
const router = require('./routes/route')

db.connect();

//rest object
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//routes
app.use("/",router);


const PORT = process.env.PORT || 3100
//listen
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});