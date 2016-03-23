// /blockfactory/#bot_is_raining

Blockly.Blocks['bot_is_raining'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("it's raining")
    this.setOutput(true, 'Boolean')
    this.setColour(260)
    this.setTooltip('')
    this.setHelpUrl('http://www.example.com/')
  }
}

// TODO: validate this is in a bot/on flow

Blockly.JavaScript['bot_is_raining'] = function (block) {
  return ['bot.isRaining', Blockly.JavaScript.ORDER_NONE]
}

Blockly.addToolboxItem('bot_is_raining', document.getElementById('tbMCclient'))
