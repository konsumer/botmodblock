/* global Blockly */

const electron = require('electron')
const hl = require('highlight.js').highlight
const beautify = require('js-beautify').js_beautify
const dialog = electron.remote.require('dialog')
const fs = require('fs')
const mineflayer = require('mineflayer')
const format = require('standard-format').transform

const factory = window.location.toString().indexOf('factory.html') !== -1

require('./blocks/common')
require('./blocks/bot')
require('./blocks/mod')
require('./blocks/nonmc')

const filters = [
  { name: 'Xml', extensions: ['xml'] },
  { name: 'All Files', extensions: ['*'] }
]

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
            Blockly.Xml.domToWorkspace(window.workspace, xml)
          })
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function (item, focusedWindow) {
          dialog.showSaveDialog({filters: filters}, function (filename) {
            var xml = Blockly.Xml.workspaceToDom(window.workspace)
            var xmlText = Blockly.Xml.domToText(xml)
            fs.writeFileSync(filename, xmlText)
          })
        }
      },
      {
        label: 'Run',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          const code = getCode()
          var func = new Function('mineflayer', code) // eslint-disable-line no-new-func
          try {
            func(mineflayer)
          } catch (e) {
            window.alert('There was an error with your code (see developer console.)')
            console.log(code)
            console.error(e)
          }
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
          var code = getCode()
          const html = '<head><link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/monokai-sublime.min.css"><style>body {font-family: \'Source Code Pro\', ;color: #f8f8f2; background: #23241f}</style></head><body><pre><code>' + hl('javascript', beautify(code)).value + '</code></pre></body>'
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
      },
      {
        label: factory ? 'botmodblock' : 'Block Factory',
        accelerator: 'Command+Alt+B',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            if (factory) {
              window.location = 'index.html'
            } else {
              window.location = 'factory.html'
            }
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

window.workspace = window.Blockly.inject(document.getElementById('blocklyDiv'), {
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

window.workspace.addChangeListener(Blockly.Events.disableOrphans)

function getCode () {
  var code = factory ? window.factoryCode() : Blockly.JavaScript.workspaceToCode(window.workspace)
  return format(code)
}

if (factory) {
  window.previewWorkspace = window.Blockly.inject(document.getElementById('factoryPreview'), {
    scrollbars: true,
    media: 'blockly/media/'
  })
  var xml = '<xml><block type="factory_base" deletable="false" movable="false"></block></xml>'
  Blockly.Xml.domToWorkspace(window.Blockly.Xml.textToDom(xml), window.workspace)
  // getCode updates preview window
  window.workspace.addChangeListener(getCode)
}
