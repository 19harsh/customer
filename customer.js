const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(express.json())
var database


app.get('/', (req, resp) => {
    resp.send('Welcome to Customers db')
})
app.get('/api/details', (req, resp) => {
    database.collection('details').find({}).toArray((err, result) => {
        if (err) throw err
        resp.send(result)
    })
})


app.get('/api/details/:firstName', (req, resp) => {
    database.collection('details').find({ firstName: req.params.firstName }).toArray((err, result) => {
        if (err) throw err
        resp.send(result)
    })
})

app.post('/api/details/addCustomers', (req, resp) => {
    let res = database.collection('details').find({}).sort({ id: -1 }).limit(1)
    res.forEach(obj => {
        if (obj) {
            let detail = {
                id: obj.id + 1,
                firstName: req.body.firstName,
                age: req.body.age
            }
            database.collection('details').insertOne(detail, (err, result) => {
                if (err) resp.status(500).send(err)
                resp.send("Added Successfully")
            })
        }
    })
})


app.listen(3000, () => {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, result) => {
        if (error) throw error
        database = result.db('Customer')
        console.log('Connection sucessful!')
    })
})