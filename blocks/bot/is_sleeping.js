Blockly.Blocks['bot_is_sleeping'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("sleeping?")
    this.setOutput(true, 'Boolean')
    this.setColour(260)
    this.setTooltip('Is your bot in bed?')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#botissleeping')
  },
  onchange: function (event) {
    var err = null
    if (!require('../utils').inBotBolock(this)) {
      err = 'This block must be inside a minecraft bot block.'
    }
    this.setWarningText(err)
  }
}

Blockly.JavaScript['bot_is_sleeping'] = function (block) {
  return ['bot.isSleeping', Blockly.JavaScript.ORDER_NONE]
}
