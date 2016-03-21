function generic_info (block) {
  return block.getFieldValue('value')
}

var blocks = []
fetch('/blocks')
  .then(function(r){ return r.json() })
  .then(function(r){ blocks = r })

Blockly.Blocks['bot_data_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('block')
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(blocks), 'value')
    this.setOutput(true, 'Number')
    this.setTooltip('A minecraft block-type')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#mineflayerblocks')
  }
}

Blockly.JavaScript['bot_data_block'] = generic_info
Blockly.addToolboxItem('bot_data_block', document.getElementById('tbMCclient'))

// var items = []
// fetch('/items')
//   .then(function(r){ return r.json() })
//   .then(function(r){ items = r })

// Blockly.Blocks['bot_data_item'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField('item')
//     this.appendDummyInput()
//         .appendField(new Blockly.FieldDropdown(items), 'value')
//     this.setOutput(true, 'Number')
//     this.setTooltip('A minecraft item-type')
//     this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#mineflayeritems')
//   }
// }

// Blockly.JavaScript['bot_data_item'] = generic_info
// Blockly.addToolboxItem('bot_data_item', document.getElementById('tbMCclient'))

var instruments = []
fetch('/instruments')
  .then(function(r){ return r.json() })
  .then(function(r){ instruments = r })

Blockly.Blocks['bot_data_instrument'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('instrument')
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(instruments), 'value')
    this.setOutput(true, 'String')
    this.setTooltip('A minecraft instrument-type')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#mineflayerinstruments')
  }
}

Blockly.JavaScript['bot_data_instrument'] = generic_info
Blockly.addToolboxItem('bot_data_instrument', document.getElementById('tbMCclient'))

