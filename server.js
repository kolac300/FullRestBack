const express = require("express");
const mongoose = require('mongoose');
const User = require('./models/userModel')
const app = express()
const uri = "mongodb+srv://admin:dge65TRxxfvweBrK@cluster1.xswipq5.mongodb.net/test?retryWrites=true&w=majority";

app.use(express.json())
//routes 

app.get('/', (req, res) => {
    res.send('hi it is my backend application')
})
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const users = await User.findById(id)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true, runValidators: true
        })
        // we can't find user in db
        if (!user) {
            return res.status(404).json({ message: `can not find user with ID ${id}` })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id, req.body)
        // we can't find user in db
        if (!user) {
            return res.status(404).json({ message: `can not find user with ID ${id}` })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

mongoose.connect(uri)
    .then(() => console.log('Connected!'))
    .then(() => {
        app.listen(3000, () => {
            console.log(`Node API app is running on port 3000`)
        })
    });