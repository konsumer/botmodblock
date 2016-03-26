Blockly.Blocks['bot_end'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('end')
    this.setPreviousStatement(true)
    this.setColour(260)
    this.setTooltip('End the connection with the server.')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botend')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_end'] = function (block) {
  return 'bot.end()\n'
}

// no need for end & quit both.
// Blockly.addToolboxItem('bot_end', document.getElementById('tbMCclient'))
