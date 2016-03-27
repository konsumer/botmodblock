Blockly.Blocks['bot_quit'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('quit')
    this.appendValueInput('REASON')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('reason')
    this.setPreviousStatement(true)
    this.setColour(260)
    this.setTooltip('Gracefully disconnect from the server with the given reason.')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botquitreason')
  },
  onchange: function (event) {
    var err = null
    if (!require('../utils').inBotBolock(this)) {
      err = 'This block must be inside a minecraft bot block.'
    }
    this.setWarningText(err)
  }
}

Blockly.JavaScript['bot_quit'] = function (block) {
  var value_reason = Blockly.JavaScript.valueToCode(block, 'REASON', Blockly.JavaScript.ORDER_ATOMIC)
  var code = `bot.quit(${value_reason})
`
  return code
}

Blockly.addToolboxItem('bot_quit', document.getElementById('tbMCclient'))
