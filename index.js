const { MongoClient } = require("mongodb");
const express = require('express');
const path = require('path');
// Replace the uri string with your connection string.
const uri = "mongodb+srv://bibiashviliandria:andria1234@cluster0.ub53t9l.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const database = client.db('Seterebi');
const users = database.collection('users');

const app = express();

app.set('views', '');
app.set('view engine', 'ejs');

app.get('/users/:page', async (req, res) => {
    const page = parseInt(req.params.page);
    const limit = 20;
    const startIndex = (page - 1) * limit;

    try {
        const users = await database
            .collection('users')
            .find({})
            .sort({ updated_at: -1 })
            .skip(startIndex)
            .limit(limit)
            .toArray();

        res.render('index', { users: users, page: page, limit: limit });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});



// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});



