Blockly.JavaScript['text_print'] = function (block) {
  // Print statement.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || "''"
  return 'console.log(' + argument0 + ')\n'
}
