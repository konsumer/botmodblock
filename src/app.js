var hl = require('highlight.js').highlight
var beautify = require('js-beautify').js_beautify

var blocklyDiv = document.getElementById('blocklyDiv')
var blocklyArea = document.getElementById('blocklyArea')
var blocklyToolbox = document.getElementById('blocklyToolbox')
var overlay = document.getElementById('overlay')
var overlayCloseButton = document.getElementById('overlayCloseButton')
var overlayContent = document.getElementById('overlayContent')
var linkButton = document.getElementById('linkButton')

var workspace = window.Blockly.inject(blocklyDiv, {
  toolbox: blocklyToolbox,
  trashcan: true,
  zoom: true,
  media: 'https://blockly-demo.appspot.com/static/media/'
})

window.Blockly.addToolboxItem = function (type, parent) {
  parent = parent || blocklyToolbox
  var block = document.createElement('block')
  block.setAttribute('type', type)
  parent.appendChild(block)
  workspace.updateToolbox(document.getElementById('blocklyToolbox'))
  return block
}

window.Blockly.addToolboxCategory = function (name, parent) {
  parent = parent || blocklyToolbox
  var category = document.createElement('category')
  category.setAttribute('name', name)
  parent.appendChild(category)
  workspace.updateToolbox(document.getElementById('blocklyToolbox'))
  return category
}

if ('BlocklyStorage' in window) {
  BlocklyStorage.HTTPREQUEST_ERROR =
    'There was a problem with the request.\n'
  BlocklyStorage.LINK_ALERT =
    'Share your blocks with this link:\n\n%1'
  BlocklyStorage.HASH_ERROR =
    'Sorry, "%1" doesn\'t correspond with any saved Blockly file.'
  BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n' +
    'Perhaps it was created with a different version of Blockly?'
  var linkButton = document.getElementById('linkButton')
  linkButton.style.display = 'inline-block'
  linkButton.addEventListener('click', function () {
    BlocklyStorage.link(workspace)
  })
}

// Create the root block.
if ('BlocklyStorage' in window && window.location.hash.length > 1) {
  BlocklyStorage.retrieveXml(window.location.hash.substring(1), workspace)
}

require('./blocks/common')
require('./blocks/bot')
require('./blocks/mod')
require('./blocks/universal')

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

overlayCloseButton.addEventListener('click', function () {
  overlay.style.visibility = 'hidden'
})

document.getElementById('btnShowCode').addEventListener('click', function (e) {
  var code = beautify(Blockly.JavaScript.workspaceToCode(workspace), { indent_size: 2 })
  overlayContent.innerHTML = `<div><pre><code>
${hl('javascript', code).value}
</code></pre></div>`
  overlay.style.visibility = 'visible'
})
