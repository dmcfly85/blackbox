const express = require('express')
const app = express()
const mockData = require('./mock-dump1090-data.json')

app.get('/dump1090/data.json', function (req, res) {
  res.send(mockData.set1)
})

app.listen(3000, function () {
  console.log('Mock dump1090 server listening on port 8080!')
})
