//modules for work
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
//port config
const PORT = process.env.PORT || 3000
const app = express()
//handlebars engine connection
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(todoRoutes)
app.use(express.static(path.join(__dirname,'public')))

//main function
async function start() {
    try {
        //Mongo DB connection
        await mongoose.connect('mongodb+srv://root:1029384756@cluster0.sb4vl.mongodb.net/todos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false
        })

        app.listen(PORT, ()=> {
            console.log("Server started")
        })
    }
    catch (e) {
        console.log(e)
    }
}

//server start
start()
