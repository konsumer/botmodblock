// TODO: check if it's in an on-block or if top-in is bot.

Blockly.Blocks['bot_forward_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('start moving forward')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('start moving forward')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botsetcontrolstatecontrol-state')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_forward_on'] = function (block) {
  return "bot.setControlState('forward', true)\n"
}

Blockly.Blocks['bot_back_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('start moving back')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('start moving back')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botsetcontrolstatecontrol-state')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_back_on'] = function (block) {
  return "bot.setControlState('back', true)\n"
}

Blockly.Blocks['bot_left_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('start moving left')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('start moving left')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botsetcontrolstatecontrol-state')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_left_on'] = function (block) {
  return "bot.setControlState('back', true)\n"
}

Blockly.Blocks['bot_right_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('start moving left')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('start moving left')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botsetcontrolstatecontrol-state')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_right_on'] = function (block) {
  return "bot.setControlState('right', true)\n"
}

Blockly.Blocks['bot_forward_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('stop moving forward')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('stop moving forward')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botsetcontrolstatecontrol-state')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_forward_off'] = function (block) {
  return "bot.setControlState('forward', true)\n"
}

Blockly.Blocks['bot_back_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('stop moving back')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('stop moving back')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botsetcontrolstatecontrol-state')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_back_off'] = function (block) {
  return "bot.setControlState('back', true)\n"
}

Blockly.Blocks['bot_left_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('stop moving left')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('stop moving left')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botsetcontrolstatecontrol-state')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_left_off'] = function (block) {
  return "bot.setControlState('back', true)\n"
}

Blockly.Blocks['bot_right_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('stop moving left')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('stop moving left')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botsetcontrolstatecontrol-state')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_right_off'] = function (block) {
  return "bot.setControlState('right', true)\n"
}

// TODO: these are obtuse. Use mineflayer-navigate?

// Blockly.addToolboxItem('bot_forward_on', document.getElementById('tbMCclient'))
// Blockly.addToolboxItem('bot_forward_off', document.getElementById('tbMCclient'))
// Blockly.addToolboxItem('bot_back_on', document.getElementById('tbMCclient'))
// Blockly.addToolboxItem('bot_back_off', document.getElementById('tbMCclient'))
// Blockly.addToolboxItem('bot_right_on', document.getElementById('tbMCclient'))
// Blockly.addToolboxItem('bot_right_off', document.getElementById('tbMCclient'))
// Blockly.addToolboxItem('bot_left_on', document.getElementById('tbMCclient'))
// Blockly.addToolboxItem('bot_left_off', document.getElementById('tbMCclient'))
