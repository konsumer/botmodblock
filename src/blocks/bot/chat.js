// /blockfactory/#bot_chat

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
    var err
    if (!this.getInput('MESSAGE').connection.targetBlock()) {
      this.setWarningText('Must have a message')
      err = true
    }
    if (!err) {
      this.setWarningText(null)
    }
  }
}

Blockly.JavaScript['bot_chat'] = function (block) {
  var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC)
  return `bot.chat(${value_message})`
}

Blockly.addToolboxItem('bot_chat', document.getElementById('tbMCclient'))
