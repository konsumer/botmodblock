// simple way to grab generated value with defaults from a field
module.exports.val = function(block, name){
  return JSON.stringify(Blockly.JavaScript.valueToCode(block, name, Blockly.JavaScript.ORDER_ATOMIC) || block.getFieldValue(name))
}
