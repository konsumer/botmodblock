// /blockfactory/#bot_on_handle

var eventTypes = {
  'chat': 'username, message, translate, jsonMsg, matches',
  'whisper': 'username, message, translate, jsonMsg, matches',
  'message': 'jsonMsg',
  'login': '',
  'spawn': '',
  'respawn': '',
  'game': '',
  'rain': '',
  'time': '',
  'kicked': 'reason, loggedIn',
  'end': '',
  'spawnReset': '',
  'death': '',
  'health': '',
  'entitySwingArm': 'entity',
  'entityHurt': 'entity',
  'entityWake': 'entity',
  'entityEat': 'entity',
  'entityCrouch': 'entity',
  'entityUncrouch': 'entity',
  'entityEquipmentChange': 'entity',
  'entitySleep': 'entity',
  'entitySpawn': 'entity',
  'playerCollect': 'collector, collected',
  'entityGone': 'entity',
  'entityMoved': 'entity',
  'entityDetach': 'entity, vehicle',
  'entityAttach': 'entity, vehicle',
  'entityUpdate': 'entity',
  'entityEffect': 'entity, effect',
  'entityEffectEnd': 'entity, effect',
  'playerJoined': 'player',
  'playerLeft': 'player',
  'blockUpdate': 'oldBlock, newBlock',
  'blockUpdate:(x, y, z': 'oldBlock, newBlock',
  'chunkColumnLoad': 'point',
  'chunkColumnUnload': 'point',
  'soundEffectHeard': 'soundName, position, volume, pitch',
  'noteHeard': 'block, instrument, pitch',
  'pistonMove': 'block, isPulling, direction',
  'chestLidMove': 'block, isOpen',
  'blockBreakProgressObserved': 'block, destroyStage',
  'blockBreakProgressEnd': 'block',
  'diggingCompleted': 'block',
  'diggingAborted': 'block',
  'move': '',
  'forcedMove': '',
  'mount': '',
  'dismount': 'vehicle',
  'windowOpen': 'window',
  'windowClose': 'window',
  'sleep': '',
  'wake': '',
  'experience': '',
  'scoreboardObjective': 'scoreboardName, displayText',
  'scoreboardScore': 'scoreboardName, itemName, value',
  'scoreboardDisplayObjective': 'scoreboardName, position'
}

Blockly.Blocks['bot_on_handle'] = {
  init: function () {
    this.appendStatementInput('CALLBACK')
      .setCheck('procedures_callnoreturn')
      .appendField('on')
      .appendField(new Blockly.FieldDropdown(Object.keys(eventTypes).map(function (o) { return [o, o] })), 'EVENT')
      .appendField('do')
    this.setPreviousStatement(true, 'bot')
    this.setNextStatement(true, 'bot')
    this.setColour(260)
    this.setTooltip('Handle an event that your bot saw.')
    this.setHelpUrl('https://github.com/PrismarineJS/mineflayer/blob/master/doc/api.md#events')
  },
  onchange: function (event) {
    // TODO: add args to variables so you can use them in statement
  }
}

Blockly.JavaScript['bot_on_handle'] = function (block) {
  var dropdown_event = block.getFieldValue('EVENT')
  var statements_callback = Blockly.JavaScript.statementToCode(block, 'CALLBACK')
  return `.on('${dropdown_event}', function(${eventTypes[dropdown_event]}){
  var bot = this
  ${statements_callback}
})

`
}

Blockly.addToolboxItem('bot_on_handle', document.getElementById('tbMCclient'))
