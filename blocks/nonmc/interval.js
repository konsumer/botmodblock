Blockly.Blocks['time_interval'] = {
  init: function () {
    this.appendValueInput('WAIT')
      .setCheck('Number')
      .appendField('every')
      .appendField(new Blockly.FieldDropdown([['minutes', 'MINUTES'], ['seconds', 'SECONDS'], ['ms', 'MILLISECONDS']]), 'UNIT')
    this.appendStatementInput('DO')
      .appendField('do')
    this.setColour(210)
    this.setTooltip('do something repeatedly at an interval')
    this.setHelpUrl('https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval')
  }
}

Blockly.JavaScript['time_interval'] = function (block) {
  var dropdown_unit = block.getFieldValue('UNIT')
  var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC)
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO')

  var time = value_wait

  if (dropdown_unit == 'MINUTES') {
    time = value_wait + ' * 60 * 1000'
  }

  if (dropdown_unit == 'SECONDS') {
    time = value_wait + ' * 1000'
  }

  return `setInterval(function(){
  ${statements_do}
}, ${time})
`
}
