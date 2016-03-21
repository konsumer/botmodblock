// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#imrxy5

var eventTypes = {
  'chat' : 'username|message|translate|jsonMsg|matches',
  'whisper' : 'username|message|translate|jsonMsg|matches',
  'message' : 'jsonMsg',
  'login' : '',
  'spawn' : '',
  'respawn' : '',
  'game' : '',
  'rain' : '',
  'time' : '',
  'kicked' : 'reason|loggedIn',
  'end' : '',
  'spawnReset' : '',
  'death' : '',
  'health' : '',
  'entitySwingArm' : 'entity',
  'entityHurt' : 'entity',
  'entityWake' : 'entity',
  'entityEat' : 'entity',
  'entityCrouch' : 'entity',
  'entityUncrouch' : 'entity',
  'entityEquipmentChange' : 'entity',
  'entitySleep' : 'entity',
  'entitySpawn' : 'entity',
  'playerCollect' : 'collector|collected',
  'entityGone' : 'entity',
  'entityMoved' : 'entity',
  'entityDetach' : 'entity|vehicle',
  'entityAttach' : 'entity|vehicle',
  'entityUpdate' : 'entity',
  'entityEffect' : 'entity|effect',
  'entityEffectEnd' : 'entity|effect',
  'playerJoined' : 'player',
  'playerLeft' : 'player',
  'blockUpdate' : 'oldBlock|newBlock',
  'blockUpdate:(x|y|z' : 'oldBlock|newBlock',
  'chunkColumnLoad' : 'point',
  'chunkColumnUnload' : 'point',
  'soundEffectHeard' : 'soundName|position|volume|pitch',
  'noteHeard' : 'block|instrument|pitch',
  'pistonMove' : 'block|isPulling|direction',
  'chestLidMove' : 'block|isOpen',
  'blockBreakProgressObserved' : 'block|destroyStage',
  'blockBreakProgressEnd' : 'block',
  'diggingCompleted' : 'block',
  'diggingAborted' : 'block',
  'move' : '',
  'forcedMove' : '',
  'mount' : '',
  'dismount' : 'vehicle',
  'windowOpen' : 'window',
  'windowClose' : 'window',
  'sleep' : '',
  'wake' : '',
  'experience' : '',
  'scoreboardObjective' : 'scoreboardName|displayText',
  'scoreboardScore' : 'scoreboardName|itemName|value',
  'scoreboardDisplayObjective' : 'scoreboardName|position'
}

Blockly.Blocks['bot_on_handle'] = {
  init: function() {
    this.appendStatementInput("DO")
        .setCheck("Function")
        .appendField("on")
        .appendField(new Blockly.FieldDropdown(Object.keys(eventTypes).map(function(o){ return [o, o] })), "on")
        .appendField("do")
    this.setPreviousStatement(true, "bot")
    this.setNextStatement(true, "bot")
    this.setColour(260)
    this.setTooltip('Handle an event that your bot saw.')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#events')
  }
}


Blockly.JavaScript['bot_on_handle'] = function(block) {
  var on = block.getFieldValue('on')
  var code = Blockly.JavaScript.statementToCode(block, 'DO')
  return `
.on('${on}', function(${eventTypes[on].split('|').join(', ')}){
${code}
})
`
};

Blockly.addToolboxItem('bot_on_handle', document.getElementById('tbMCclient'))