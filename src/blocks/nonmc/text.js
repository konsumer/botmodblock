/**
 * overrides for Google's text blocks, for node
 */

Blockly.JavaScript['text_print'] = function (block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || "''"
  return 'console.log(' + argument0 + ')\n'
}

// DEP: prompt: require('readline-sync').question
Blockly.JavaScript['text_prompt_ext'] = function (block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'))
  } else {
    // External message.
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || "''"
  }
  var code = 'prompt(' + msg + ')'
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER'
  if (toNumber) {
    code = 'parseFloat(' + code + ')'
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
}
