var fs = require('fs')
var path = require('path')
var SandCastle = require('sandcastle').SandCastle
var express = require('express')
var randomWords = require('random-words')
var expressStatic = require('express-static')
var enchilada = require('enchilada')
var bodyParser = require('body-parser')

var port = process.env.PORT || 4000

var app = express()
var sandcastle = new SandCastle({ timeout: 6000, api: './run_api.js'})

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// emulate cloud-storage feature
app.post('/storage', function (req, res, next) {
  if (req.body.key) {
    fs.readFile(path.join(__dirname, 'saved', req.body.key + '.xml'), function (err, data) {
      if (err) return next(err)
      res.send(data)
    })
  }else if (req.body.xml) {
    var key = randomWords(3).join('_')
    fs.writeFile(path.join(__dirname, 'saved', key + '.xml'), req.body.xml.toString(), function (err, data) {
      if (err) return next(err)
      res.send(key)
    })
  }
})

app.post('/run', function (req, res, next) {
  sandcastle.kill()
  var script = sandcastle.createScript('exports.main=function(){\n' + req.body.code + '\n}')
  script.on('exit', function(err, output) {
    if (err){
      res.status(500)
      return res.send(err)
    }
    res.send(output)
    sandcastle.kill()
  })
  script.on('timeout', function() {
    res.send(true)
    sandcastle.kill()
  })
  script.run()
})

app.use(enchilada(path.join(__dirname, 'src')))
app.use(expressStatic(path.join(__dirname, 'pub')))
app.listen(port)
console.log('Running demo on http://localhost:' + port)
