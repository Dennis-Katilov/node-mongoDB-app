//router include and config
const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')

router.get ('/', async (req, res) => {
    //find all items from DB
    const todos = await Todo.find({}).lean()
    //render to view
    res.render('index', {
        title: 'The books that are read',
        isIndex: true,
        todos
    })
})

//route to create page
router.get ('/create', (req, res) => {
    res.render('create', {
        title: 'Create books',
        isCreate: true
    })
})

//route to create function
router.post('/create', async (req,res) => {
    const todo = new Todo({
        title: req.body.title
    })
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res)=> {
    const todo = await Todo.findById(req.body.id)
    todo.completed = !todo.completed
    await todo.save()
    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    const todo = await Todo.findById(req.body.delId)
    todo.completed = !todo.completed
    await todo.delete()
    res.redirect('/')
})

module.exports = router