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
    var err = null
    if (!require('../utils').inBotBolock(this)) {
      err = 'This block must be inside a minecraft bot block.'
    }
    this.setWarningText(err)
  }
}

Blockly.JavaScript['bot_end'] = function (block) {
  return 'bot.end()\n'
}
