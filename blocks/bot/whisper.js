Blockly.Blocks['bot_whisper'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('whisper to')
    this.appendValueInput('USERNAME')
      .setCheck('String')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('username')
    this.appendValueInput('MESSAGE')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('message')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour(260)
    this.setTooltip('Say something only to a specific user')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botwhisperusername-message')
  },
  onchange: function (event) {
    var err = null
    if (!require('../utils').inBotBolock(this)) {
      err = 'This block must be inside a minecraft bot block.'
    }
    if (!this.getInput('USERNAME').connection.targetBlock()) {
      err = 'Must have a user'
    }
    if (!this.getInput('MESSAGE').connection.targetBlock()) {
      err = 'Must have a message'
    }
    this.setWarningText(err)
  }
}

Blockly.JavaScript['bot_whisper'] = function (block) {
  var value_username = Blockly.JavaScript.valueToCode(block, 'USERNAME', Blockly.JavaScript.ORDER_ATOMIC)
  var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC)
  var code = `bot.whisper(${value_username}, ${value_message})
`
  return code
}
