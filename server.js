const express = require("express");
const app = express()


//routes 

app.get('/', (req, res) => {
    res.send('hi it is my backend application')
})

app.listen(3000, () => {
    console.log(`Node API app is running on port 3000`)
})