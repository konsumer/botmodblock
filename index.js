var path = require('path')
var express = require('express')
var mineflayer = require('mineflayer')
var expressStatic = require('express-static')
var enchilada = require('enchilada')
var app = express()
var port = process.env.PORT || 4000

var blocks = []
for (var i in mineflayer.blocks){
  blocks.push([mineflayer.blocks[i].displayName, mineflayer.blocks[i].id])
}
app.get('/blocks', function(req, res){
  res.send(blocks);
})

var items = []
for (var i in mineflayer.items){
  items.push([mineflayer.items[i].displayName, mineflayer.items[i].id])
}
app.get('/items', function(req, res){
  res.send(items);
})

var instruments = []
for (var i in mineflayer.instruments){
  instruments.push([mineflayer.instruments[i].name, mineflayer.instruments[i].id])
}
app.get('/instruments', function(req, res){
  res.send(instruments);
})


app.use(enchilada(path.join(__dirname, 'src')))
app.use(expressStatic(path.join(__dirname, 'pub')))
app.listen(port)
console.log('Running demo on http://localhost:' + port)
