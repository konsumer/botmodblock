// simple way to grab generated value with defaults from a field
module.exports.val = function (block, name) {
  return JSON.stringify(Blockly.JavaScript.valueToCode(block, name, Blockly.JavaScript.ORDER_ATOMIC) || block.getFieldValue(name))
}

// determine if a block is in a bot-connect block, and if not set it's warning
module.exports.inBotBolock = function (testblock) {
  var legal = false
  var block = testblock
  do {
    if (block.type === 'bot_connect_to_server') {
      legal = true
      break
    }
    block = block.getSurroundParent()
  } while (block)
  if (legal) {
    testblock.setWarningText(null)
  } else {
    testblock.setWarningText('This block must be inside a minecraft bot block.')
  }
}
