// npm run devStart


require('dotenv').config()

const express = require('express') // bring in express 
const app = express() // app will hold the express app
const mongoose = require('mongoose') // bring in mongoose

// connect to db
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

// db will hold the mongoose connection
const db = mongoose.connection
//display error message if unsuccessful connection
db.on('error', (error) => console.error(error))
// display connection message once at the open of db
db.once('open', () => console.log('Connected to Database'))

app.use(express.json()) // allow the app to use json 

// sets router so that any url with /players
// will use the players router
const playersRouter = require('./routes/players')
app.use('/players', playersRouter )

// sets router so that any url with /teams
// will use the teams router
const teamsRouter = require('./routes/teams')
app.use('/teams', teamsRouter)




// app listen to port 3000
app.listen(3001, () => console.log('Server Started')) 