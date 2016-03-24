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
    // TODO: check if it's in an on-block or if top-in is bot.
  }
}

// TODO: check if it's in an on-block or if top-in is bot.

Blockly.JavaScript['bot_end'] = function (block) {
  return `bot.end()
`
}

// no need for end & quit
// Blockly.addToolboxItem('bot_end', document.getElementById('tbMCclient'))
