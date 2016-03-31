/* global Blockly */

const electron = require('electron')
const hl = require('highlight.js').highlight
const beautify = require('js-beautify').js_beautify
const dialog = electron.remote.require('dialog')
const fs = require('fs')

const VM = require('vm2').VM
var vm = new VM({
  timeout: 1000,
  sandbox: {
    mineflayer: require('mineflayer')
  }
})

require('./blocks/common')
require('./blocks/bot')
require('./blocks/mod')
require('./blocks/nonmc')

const filters = [
  { name: 'Xml', extensions: ['xml'] },
  { name: 'All Files', extensions: ['*'] }
]

var codestyle = fs.readFileSync('node_modules/highlight.js/styles/github.css').toString()

var blocklyDiv = document.getElementById('blocklyDiv')
var blocklyArea = document.getElementById('blocklyArea')

var template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function (item, focusedWindow) {
          dialog.showOpenDialog({filters: filters}, function (filename) {
            var xml = Blockly.Xml.textToDom(fs.readFileSync(filename[0]))
            Blockly.Xml.domToWorkspace(workspace, xml)
          })
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function (item, focusedWindow) {
          dialog.showSaveDialog({filters: filters}, function (filename) {
            var xml = Blockly.Xml.workspaceToDom(workspace)
            var xml_text = Blockly.Xml.domToText(xml)
            fs.writeFileSync(filename, xml_text)
          })
        }
      },
      {
        label: 'Run',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          const code = Blockly.JavaScript.workspaceToCode(window.workspace)
          vm.run(code)
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Code',
        accelerator: 'Shift+CmdOrCtrl+C',
        click: function (item, focusedWindow) {
          var code = Blockly.JavaScript.workspaceToCode(window.workspace)
          const html = '<head><style>' + codestyle + '</style></head><body><pre><code>' + hl('javascript', beautify(code)).value + '</code></pre></body>'
          window.open('data:text/html,' + encodeURIComponent(html))
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        }
      }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: function () { electron.shell.openExternal('https://github.com/konsumer/botmodblock') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  var name = electron.remote.app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () { window.close() }
      }
    ]
  })
  // Window menu.
  template[4].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  )
}

var menu = electron.remote.Menu.buildFromTemplate(template)
electron.remote.Menu.setApplicationMenu(menu)

const workspace = window.Blockly.inject(blocklyDiv, {
  toolbox: document.getElementById('blocklyToolbox'),
  trashcan: true,
  zoom: {
    controls: false,
    wheel: false,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  media: 'blockly/media/'
})

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
