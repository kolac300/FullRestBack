// const mongoose = require('mongoose');
// const User = require('./models/userModel')
// const uri = "mongodb+srv://admin:dge65TRxxfvweBrK@cluster1.xswipq5.mongodb.net/test?retryWrites=true&w=majority";

const express = require("express");
const {db} = require('./firebase')
const serverless = require('serverless-http')
const app = express()
const router = express.Router()

app.use(express.json())
app.use('/', router);


router.use((req, res, next) => {

    const allowedOrigins = ['https://mybacs.com', 'http://127.0.0.1:9292'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    next();
});

// routes 

router.get('/', (req, res) => {
    res.send('Hi, I am mybacs API service')
})




router.get('/users', async (req, res) => {
    try {
        // Reference to the "users" collection
        const usersCollection = db.collection('users');

        // Get all documents in the collection
        const snapshot = await usersCollection.get();

        // Initialize an empty array to store the user data
        const users = [];

        // Loop through the documents and add them to the array
        snapshot.forEach((doc) => {
            users.push(doc.data());
        });

        // Return the array of user data
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userRef = db.collection('users').doc(id);

        // Set the data for the new user document
        await userRef.set(req.body);

        // Retrieve the newly created document
        const newUser = await userRef.get();
        
        // Return the new user data
        res.status(201).json(newUser.data());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userRef = db.collection('users').doc(id);

        // Retrieve the user document by ID
        const userSnapshot = await userRef.get();

        // Check if the user exists
        if (!userSnapshot.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user data
        res.status(200).json(userSnapshot.data());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Define a route to update a document in the "users" collection by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userRef = db.collection('users').doc(id);

        // Check if the user document exists
        const userSnapshot = await userRef.get();
        if (!userSnapshot.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user document with the new data from the request body
        await userRef.update(req.body);

        // Retrieve the updated user document
        const updatedUserSnapshot = await userRef.get();

        // Return the updated user data
        res.status(200).json(updatedUserSnapshot.data());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Node API app is running on port ${port}`);
});




// router.get('/users', async (req, res) => {
//     const User = db.collection('users').doc('answers')
//     try {
//         const users = await User.find({})
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.post('/users', async (req, res) => {
//     const User = db.collection('users').doc('answers')
//     try {
//         const user = await User.set(req.body)
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// })







// router.get('/users', async (req, res) => {
   
//     try {
//         const users = await User.find({})
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })
// router.get('/users/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const users = await User.findOne({ userSessionID: id })
//         // const users = await User.findById(id)
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })


// router.put('/users/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const user = await User.findOneAndUpdate({ userSessionID: id }, req.body, {
//             new: true, runValidators: true
//         })
//         // we can't find user in db
//         if (!user) {
//             return res.status(404).json({ message: `can not find user with ID ${id}` })
//         }
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// })
// router.delete('/users/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const user = await User.findByIdAndDelete(id, req.body)
//         // we can't find user in db
//         if (!user) {
//             return res.status(404).json({ message: `can not find user with ID ${id}` })
//         }
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// })



// mongoose.connect(uri)
//     .then(() => console.log('Connected!'))
//     .then(() => {
//         app.listen(3000, () => {
//             console.log(`Node API app is running on port 3000`)
//         })
//     });