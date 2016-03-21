var hl = require('highlight.js').highlight

var blocklyDiv = document.getElementById('blocklyDiv')
var blocklyArea = document.getElementById('blocklyArea')
var blocklyToolbox = document.getElementById('blocklyToolbox')
var overlay = document.getElementById('overlay')

var workspace = window.Blockly.inject(blocklyDiv, {
  toolbox: blocklyToolbox,
  trashcan: true,
  zoom: true,
  media: 'https://blockly-demo.appspot.com/static/media/'
})


window.Blockly.addToolboxItem = function (type, parent){
  parent = parent || blocklyToolbox
  var block = document.createElement('block')
  block.setAttribute('type', type)
  parent.appendChild(block)
  workspace.updateToolbox(document.getElementById('blocklyToolbox'))
  return block
}

window.Blockly.addToolboxCategory = function (name, parent){
  parent = parent || blocklyToolbox
  var category = document.createElement('category')
  category.setAttribute('name', name)
  parent.appendChild(category)
  workspace.updateToolbox(document.getElementById('blocklyToolbox'))
  return category
}

require('./blocks/bot')
require('./blocks/mod')

// TODO: this sucks and only half-works.
function onresize (e) {
  var element = blocklyArea
  var x = 0
  var y = 0
  do {
    x += element.offsetLeft
    y += element.offsetTop
    element = element.offsetParent
  } while (element)
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px'
  blocklyDiv.style.top = y + 'px'
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px'
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px'
}

window.addEventListener('resize', onresize, false)
onresize()

overlay.addEventListener('click', function(){
  overlay.style.visibility = 'hidden'
})

document.getElementById('btnShowCode').addEventListener('click', function(e){
  overlay.innerHTML = `<div><pre><code>
${hl('javascript', Blockly.JavaScript.workspaceToCode(workspace)).value}
</code></pre></div>`
  overlay.style.visibility = 'visible'
})

// document.getElementById('btnShowXml').addEventListener('click', function(e){
//   overlay.innerHTML = `<textarea>${workspace.xmlGenerated}</textarea>`
//   overlay.style.visibility = 'visible'
// })

