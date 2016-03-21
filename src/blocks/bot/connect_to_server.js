// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u34y8j

var val = require('../utils').val

Blockly.Blocks['bot_connect_to_server'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Minecraft Bot");
    this.appendValueInput("hostname")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("hostname")
        .appendField(new Blockly.FieldTextInput("localhost"), "hostname");
    this.appendValueInput("port")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("port")
        .appendField(new Blockly.FieldTextInput("25565"), "port");
    this.appendValueInput("username")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("username")
        .appendField(new Blockly.FieldTextInput("Bot"), "username");
    this.appendValueInput("password")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("password");
    this.setNextStatement(true, "bot");
    this.setColour(260);
    this.setTooltip('Connect to a server. This is the beginning of every bot.');
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#mineflayercreatebotoptions');
  }
}


Blockly.JavaScript['bot_connect_to_server'] = function(block) {
  return `require('mineflayer').createBot({
  host: ${val(block, 'hostname')},
  port: ${val(block, 'port')},
  username: ${val(block, 'username')},
  password: ${val(block, 'password')}
})`
};

Blockly.addToolboxItem('bot_connect_to_server', document.getElementById('tbMCclient'))
