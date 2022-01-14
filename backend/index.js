const express = require('express')
const dataTableModel = require('./models/datatableModel');
const app = express()
const port = 3001
const qs = require('qs')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    const {field, term, filterValue} = qs.parse(req.url, {delimiter: /[/?&]/})
    if (field && term && filterValue) {
        dataTableModel.getFilterData(field, term, filterValue)
            .then(response => {
                res.status(200).send(JSON.stringify(response));
            })
            .catch(error => {
                res.status(500).send(error);
            })
        return;
    }
    dataTableModel.getData()
        .then(response => {
            res.status(200).send(JSON.stringify(response));
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})