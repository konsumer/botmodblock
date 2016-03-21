var path = require('path')
var express = require('express')
var expressStatic = require('express-static')
var enchilada = require('enchilada')
var app = express()
var port = process.env.PORT || 8000

app.use(enchilada(path.join(__dirname, 'src')))
app.use(expressStatic(path.join(__dirname, 'pub')))
app.listen(port)
console.log('Running demo on http://localhost:' + port)
