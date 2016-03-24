Blockly.Blocks['time_wait'] = {
  init: function () {
    this.appendValueInput('WAIT')
      .setCheck('Number')
      .appendField('wait')
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['minutes', 'MINUTES'], ['seconds', 'SECONDS'], ['ms', 'MILLISECONDS']]), 'UNIT')
    this.appendStatementInput('DO')
    this.setPreviousStatement(true, 'bot')
    this.setNextStatement(true, 'bot')
    this.setColour(210)
    this.setHelpUrl('https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout')
    this.setTooltip('wait some time before doing something')
  }
}

Blockly.JavaScript['time_wait'] = function (block) {
  var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC) | 0
  var dropdown_unit = block.getFieldValue('UNIT')
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO')

  var time = value_wait

  if (dropdown_unit == 'MINUTES'){
    time = value_wait + ' * 60 * 1000'
  }

  if (dropdown_unit == 'SECONDS'){
    time = value_wait + ' * 1000'
  }

  return `setTimeout(function(){
  ${statements_do}
}, ${time})
`
}
