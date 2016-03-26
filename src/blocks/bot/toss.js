Blockly.Blocks['bot_toss'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('toss item')
    this.appendValueInput('ITEM')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('item')
    this.appendValueInput('COUNT')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('count')
    this.setPreviousStatement(true, 'bot')
    this.setNextStatement(true, 'bot')
    this.setColour(260)
    this.setTooltip('toss an item')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#bottossitemtype-metadata-count-callback')
  },
  onchange: function (event) {
    require('../utils').inBotBolock(this)
  }
}

Blockly.JavaScript['bot_toss'] = function (block) {
  var value_item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC)
  var value_count = Blockly.JavaScript.valueToCode(block, 'COUNT', Blockly.JavaScript.ORDER_ATOMIC)
  return `bot.toss(${value_item}, null, ${value_count})
`
}

Blockly.addToolboxItem('bot_toss', document.getElementById('tbMCclient'))
