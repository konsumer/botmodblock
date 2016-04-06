Blockly.Blocks['bot_chat'] = {
  init: function () {
    this.appendValueInput('MESSAGE')
      .setCheck('String')
      .appendField('chat')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('Sends a publicly broadcast chat message. Breaks up big messages into multiple chat messages as necessary.')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botchatmessage')
  },
  onchange: function (event) {
    var err = null
    if (!require('../utils').inBotBolock(this)) {
      err = 'This block must be inside a minecraft bot block.'
    }
    if (!this.getInput('MESSAGE').connection.targetBlock()) {
      err = 'Must have a message'
    }
    this.setWarningText(err)
  }
}

Blockly.JavaScript['bot_chat'] = function (block) {
  var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC)
  return `bot.chat(${value_message})
`
}
