const express = require('express')
const mysql = require('mysql2')
const app = express()

app.use(express.json())

app.get('/customer', (req, resp) => {
    db.query('SELECT * FROM customer', (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results)
        resp.send(results)
    })
})

app.get('/customer/:firstName', (req, resp) => {
    db.query("SELECT * FROM customer where firstName=?", [req.params.firstName], (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results)
        resp.send(results)
    })
})

app.delete('/customer/:id', (req, resp) => {
    db.query("DELETE FROM customer where id=?", parseInt(req.params.id), (err, results) => {
        if (err) {
            throw err;
        }
        console.log("DELETED SUCESSFULLY")
        resp.send(results)
    })
})

app.post('/customer/addCustomers', (req, resp) => {
    let data = req.body;
    db.query("INSERT INTO customer set ?", data, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("INSERTED SUCCESSFULLY")
        resp.send(results)
    })
})

app.put('/customer', (req, resp) => {
    db.query("UPDATE `customer` SET `id`=?, `firstName`=?, `age`=? WHERE `id`= ?;", [req.body.id, req.body.firstName, req.body.age, req.body.id], (err, results) => {
        if (err) {
            throw err;
        }
        console.log("UPDATED SUCCESSFULLY")
        resp.send(results)
    })
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'harsh',
    database: 'customer',
})

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log("MYSQL CONNECTED")
})

app.listen('8000', () => {
    console.log("Server created at 8000")
})