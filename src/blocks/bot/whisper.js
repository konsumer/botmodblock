// /blockfactory/#bot_whisper

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
  }
}

Blockly.JavaScript['bot_whisper'] = function (block) {
  var value_username = Blockly.JavaScript.valueToCode(block, 'USERNAME', Blockly.JavaScript.ORDER_ATOMIC)
  var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC)
  var code = `bot.whisper(${value_username}, ${value_message})
`
  return code
}

Blockly.addToolboxItem('bot_whisper', document.getElementById('tbMCclient'))
