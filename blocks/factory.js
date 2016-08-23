/**
 * Blockly Demos: Block Factory Blocks
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Block Factory application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks['factory_base'] = {
  // Base of new block.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendField('name')
        .appendField(new Blockly.FieldTextInput('math_foo'), 'NAME');
    this.appendStatementInput('INPUTS')
        .setCheck('Input')
        .appendField('inputs');
    var dropdown = new Blockly.FieldDropdown([
        ['automatic inputs', 'AUTO'],
        ['external inputs', 'EXT'],
        ['inline inputs', 'INT']]);
    this.appendDummyInput()
        .appendField(dropdown, 'INLINE');
    dropdown = new Blockly.FieldDropdown([
        ['no connections', 'NONE'],
        ['← left output', 'LEFT'],
        ['↕ top+bottom connections', 'BOTH'],
        ['↑ top connection', 'TOP'],
        ['↓ bottom connection', 'BOTTOM']],
        function(option) {
          this.sourceBlock_.updateShape_(option);
        });
    this.appendDummyInput()
        .appendField(dropdown, 'CONNECTIONS');
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendField('color');
    this.setTooltip('Build a custom block by plugging\n' +
        'fields, inputs and other blocks here.');
    this.setHelpUrl(
        'https://developers.google.com/blockly/guides/create-custom-blocks/block-factory');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('connections', this.getFieldValue('CONNECTIONS'));
    return container;
  },
  domToMutation: function(xmlElement) {
    var connections = xmlElement.getAttribute('connections');
    this.updateShape_(connections);
  },
  updateShape_: function(option) {
    var outputExists = this.getInput('OUTPUTTYPE');
    var topExists = this.getInput('TOPTYPE');
    var bottomExists = this.getInput('BOTTOMTYPE');
    if (option == 'LEFT') {
      if (!outputExists) {
        this.addTypeInput_('OUTPUTTYPE', 'output type');
      }
    } else if (outputExists) {
      this.removeInput('OUTPUTTYPE');
    }
    if (option == 'TOP' || option == 'BOTH') {
      if (!topExists) {
        this.addTypeInput_('TOPTYPE', 'top type');
      }
    } else if (topExists) {
      this.removeInput('TOPTYPE');
    }
    if (option == 'BOTTOM' || option == 'BOTH') {
      if (!bottomExists) {
        this.addTypeInput_('BOTTOMTYPE', 'bottom type');
      }
    } else if (bottomExists) {
      this.removeInput('BOTTOMTYPE');
    }
  },
  addTypeInput_: function(name, label) {
    this.appendValueInput(name)
        .setCheck('Type')
        .appendField(label);
    this.moveInputBefore(name, 'COLOUR');
    var type = this.workspace.newBlock('type_null');
    type.setShadow(true);
    type.outputConnection.connect(this.getInput(name).connection);
    type.initSvg();
    type.render();
  }
};

var FIELD_MESSAGE = 'fields %1 %2';
var FIELD_ARGS = [
  {
    "type": "field_dropdown",
    "name": "ALIGN",
    "options": [['left', 'LEFT'], ['right', 'RIGHT'], ['centre', 'CENTRE']],
  },
  {
    "type": "input_statement",
    "name": "FIELDS",
    "check": "Field"
  }
];

var TYPE_MESSAGE = 'type %1';
var TYPE_ARGS = [
  {
    "type": "input_value",
    "name": "TYPE",
    "check": "Type",
    "align": "RIGHT"
  }
];

Blockly.Blocks['input_value'] = {
  // Value input.
  init: function() {
    this.jsonInit({
      "message0": "value input %1 %2",
      "args0": [
        {
          "type": "field_input",
          "name": "INPUTNAME",
          "text": "NAME"
        },
        {
          "type": "input_dummy"
        }
      ],
      "message1": FIELD_MESSAGE,
      "args1": FIELD_ARGS,
      "message2": TYPE_MESSAGE,
      "args2": TYPE_ARGS,
      "previousStatement": "Input",
      "nextStatement": "Input",
      "colour": 210,
      "tooltip": "A value socket for horizontal connections.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=71"
    });
  },
  onchange: function() {
    inputNameCheck(this);
  }
};

Blockly.Blocks['input_statement'] = {
  // Statement input.
  init: function() {
    this.jsonInit({
      "message0": "statement input %1 %2",
      "args0": [
        {
          "type": "field_input",
          "name": "INPUTNAME",
          "text": "NAME"
        },
        {
          "type": "input_dummy"
        },
      ],
      "message1": FIELD_MESSAGE,
      "args1": FIELD_ARGS,
      "message2": TYPE_MESSAGE,
      "args2": TYPE_ARGS,
      "previousStatement": "Input",
      "nextStatement": "Input",
      "colour": 210,
      "tooltip": "A statement socket for enclosed vertical stacks.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=246"
    });
  },
  onchange: function() {
    inputNameCheck(this);
  }
};

Blockly.Blocks['input_dummy'] = {
  // Dummy input.
  init: function() {
    this.jsonInit({
      "message0": "dummy input",
      "message1": FIELD_MESSAGE,
      "args1": FIELD_ARGS,
      "previousStatement": "Input",
      "nextStatement": "Input",
      "colour": 210,
      "tooltip": "For adding fields on a separate row with no " +
                 "connections. Alignment options (left, right, centre) " +
                 "apply only to multi-line fields.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=293"
    });
  }
};

Blockly.Blocks['field_static'] = {
  // Text value.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('text')
        .appendField(new Blockly.FieldTextInput(''), 'TEXT');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Static text that serves as a label.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=88');
  }
};

Blockly.Blocks['field_input'] = {
  // Text input.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('text input')
        .appendField(new Blockly.FieldTextInput('default'), 'TEXT')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('An input field for the user to enter text.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=319');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_number'] = {
  // Numeric input.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('numeric input')
        .appendField(new Blockly.FieldNumber(0), 'VALUE')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.appendDummyInput()
        .appendField('min')
        .appendField(new Blockly.FieldNumber(-Infinity), 'MIN')
        .appendField('max')
        .appendField(new Blockly.FieldNumber(Infinity), 'MAX')
        .appendField('precision')
        .appendField(new Blockly.FieldNumber(0, 0), 'PRECISION');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('An input field for the user to enter a number.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=319');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_angle'] = {
  // Angle input.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('angle input')
        .appendField(new Blockly.FieldAngle('90'), 'ANGLE')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('An input field for the user to enter an angle.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=372');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_dropdown'] = {
  // Dropdown menu.
  init: function() {
    this.appendDummyInput()
        .appendField('dropdown')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.optionCount_ = 3;
    this.updateShape_();
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setMutator(new Blockly.Mutator(['field_dropdown_option']));
    this.setColour(160);
    this.setTooltip('Dropdown menu with a list of options.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386');
  },
  mutationToDom: function(workspace) {
    // Create XML to represent menu options.
    var container = document.createElement('mutation');
    container.setAttribute('options', this.optionCount_);
    return container;
  },
  domToMutation: function(container) {
    // Parse XML to restore the menu options.
    this.optionCount_ = parseInt(container.getAttribute('options'), 10);
    this.updateShape_();
  },
  decompose: function(workspace) {
    // Populate the mutator's dialog with this block's components.
    var containerBlock = workspace.newBlock('field_dropdown_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.optionCount_; i++) {
      var optionBlock = workspace.newBlock('field_dropdown_option');
      optionBlock.initSvg();
      connection.connect(optionBlock.previousConnection);
      connection = optionBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Reconfigure this block based on the mutator dialog's components.
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var data = [];
    while (optionBlock) {
      data.push([optionBlock.userData_, optionBlock.cpuData_]);
      optionBlock = optionBlock.nextConnection &&
          optionBlock.nextConnection.targetBlock();
    }
    this.optionCount_ = data.length;
    this.updateShape_();
    // Restore any data.
    for (var i = 0; i < this.optionCount_; i++) {
      this.setFieldValue(data[i][0] || 'option', 'USER' + i);
      this.setFieldValue(data[i][1] || 'OPTIONNAME', 'CPU' + i);
    }
  },
  saveConnections: function(containerBlock) {
    // Store names and values for each option.
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (optionBlock) {
      optionBlock.userData_ = this.getFieldValue('USER' + i);
      optionBlock.cpuData_ = this.getFieldValue('CPU' + i);
      i++;
      optionBlock = optionBlock.nextConnection &&
          optionBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    // Modify this block to have the correct number of options.
    // Add new options.
    for (var i = 0; i < this.optionCount_; i++) {
      if (!this.getInput('OPTION' + i)) {
        this.appendDummyInput('OPTION' + i)
            .appendField(new Blockly.FieldTextInput('option'), 'USER' + i)
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('OPTIONNAME'), 'CPU' + i);
      }
    }
    // Remove deleted options.
    while (this.getInput('OPTION' + i)) {
      this.removeInput('OPTION' + i);
      i++;
    }
  },
  onchange: function() {
    if (this.workspace && this.optionCount_ < 1) {
      this.setWarningText('Drop down menu must\nhave at least one option.');
    } else {
      fieldNameCheck(this);
    }
  }
};

Blockly.Blocks['field_dropdown_container'] = {
  // Container.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('add options');
    this.appendStatementInput('STACK');
    this.setTooltip('Add, remove, or reorder options\n' +
                    'to reconfigure this dropdown menu.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386');
    this.contextMenu = false;
  }
};

Blockly.Blocks['field_dropdown_option'] = {
  // Add option.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('option');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Add a new option to the dropdown menu.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386');
    this.contextMenu = false;
  }
};

Blockly.Blocks['field_checkbox'] = {
  // Checkbox.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('checkbox')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'CHECKED')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Checkbox field.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=485');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_colour'] = {
  // Colour input.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('color')
        .appendField(new Blockly.FieldColour('#ff0000'), 'COLOUR')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Color input field.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=495');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_date'] = {
  // Date input.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('date')
        .appendField(new Blockly.FieldDate(), 'DATE')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Date input field.');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_variable'] = {
  // Dropdown for variables.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('variable')
        .appendField(new Blockly.FieldTextInput('item'), 'TEXT')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Dropdown menu for variable names.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=510');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_image'] = {
  // Image.
  init: function() {
    this.setColour(160);
    var src = 'https://www.gstatic.com/codesite/ph/images/star_on.gif';
    this.appendDummyInput()
        .appendField('image')
        .appendField(new Blockly.FieldTextInput(src), 'SRC');
    this.appendDummyInput()
        .appendField('width')
        .appendField(new Blockly.FieldNumber('15', 0, NaN, 1), 'WIDTH')
        .appendField('height')
        .appendField(new Blockly.FieldNumber('15', 0, NaN, 1), 'HEIGHT')
        .appendField('alt text')
        .appendField(new Blockly.FieldTextInput('*'), 'ALT');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Static image (JPEG, PNG, GIF, SVG, BMP).\n' +
                    'Retains aspect ratio regardless of height and width.\n' +
                    'Alt text is for when collapsed.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=567');
  }
};

Blockly.Blocks['type_group'] = {
  // Group of types.
  init: function() {
    this.typeCount_ = 2;
    this.updateShape_();
    this.setOutput(true, 'Type');
    this.setMutator(new Blockly.Mutator(['type_group_item']));
    this.setColour(230);
    this.setTooltip('Allows more than one type to be accepted.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=677');
  },
  mutationToDom: function(workspace) {
    // Create XML to represent a group of types.
    var container = document.createElement('mutation');
    container.setAttribute('types', this.typeCount_);
    return container;
  },
  domToMutation: function(container) {
    // Parse XML to restore the group of types.
    this.typeCount_ = parseInt(container.getAttribute('types'), 10);
    this.updateShape_();
    for (var i = 0; i < this.typeCount_; i++) {
      this.removeInput('TYPE' + i);
    }
    for (var i = 0; i < this.typeCount_; i++) {
      var input = this.appendValueInput('TYPE' + i)
                      .setCheck('Type');
      if (i == 0) {
        input.appendField('any of');
      }
    }
  },
  decompose: function(workspace) {
    // Populate the mutator's dialog with this block's components.
    var containerBlock = workspace.newBlock('type_group_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.typeCount_; i++) {
      var typeBlock = workspace.newBlock('type_group_item');
      typeBlock.initSvg();
      connection.connect(typeBlock.previousConnection);
      connection = typeBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Reconfigure this block based on the mutator dialog's components.
    var typeBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (typeBlock) {
      connections.push(typeBlock.valueConnection_);
      typeBlock = typeBlock.nextConnection &&
          typeBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.typeCount_; i++) {
      var connection = this.getInput('TYPE' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.typeCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.typeCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'TYPE' + i);
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var typeBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (typeBlock) {
      var input = this.getInput('TYPE' + i);
      typeBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      typeBlock = typeBlock.nextConnection &&
          typeBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    // Modify this block to have the correct number of inputs.
    // Add new inputs.
    for (var i = 0; i < this.typeCount_; i++) {
      if (!this.getInput('TYPE' + i)) {
        var input = this.appendValueInput('TYPE' + i);
        if (i == 0) {
          input.appendField('any of');
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('TYPE' + i)) {
      this.removeInput('TYPE' + i);
      i++;
    }
  }
};

Blockly.Blocks['type_group_container'] = {
  // Container.
  init: function() {
    this.jsonInit({
      "message0": "add types %1 %2",
      "args0": [
        {"type": "input_dummy"},
        {"type": "input_statement", "name": "STACK"}
      ],
      "colour": 230,
      "tooltip": "Add, or remove allowed type.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=677"
    });
  }
};

Blockly.Blocks['type_group_item'] = {
  // Add type.
  init: function() {
    this.jsonInit({
      "message0": "type",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Add a new allowed type.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=677"
    });
  }
};

Blockly.Blocks['type_null'] = {
  // Null type.
  valueType: null,
  init: function() {
    this.jsonInit({
      "message0": "any",
      "output": "Type",
      "colour": 230,
      "tooltip": "Any type is allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_boolean'] = {
  // Boolean type.
  valueType: 'Boolean',
  init: function() {
    this.jsonInit({
      "message0": "Boolean",
      "output": "Type",
      "colour": 230,
      "tooltip": "Booleans (true/false) are allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_number'] = {
  // Number type.
  valueType: 'Number',
  init: function() {
    this.jsonInit({
      "message0": "Number",
      "output": "Type",
      "colour": 230,
      "tooltip": "Numbers (int/float) are allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_string'] = {
  // String type.
  valueType: 'String',
  init: function() {
    this.jsonInit({
      "message0": "String",
      "output": "Type",
      "colour": 230,
      "tooltip": "Strings (text) are allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_list'] = {
  // List type.
  valueType: 'Array',
  init: function() {
    this.jsonInit({
      "message0": "Array",
      "output": "Type",
      "colour": 230,
      "tooltip": "Arrays (lists) are allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_other'] = {
  // Other type.
  init: function() {
    this.jsonInit({
      "message0": "other %1",
      "args0": [{"type": "field_input", "name": "TYPE", "text": ""}],
      "output": "Type",
      "colour": 230,
      "tooltip": "Custom type to allow.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=702"
    });
  }
};

Blockly.Blocks['colour_hue'] = {
  // Set the colour of the block.
  init: function() {
    this.appendDummyInput()
        .appendField('hue:')
        .appendField(new Blockly.FieldAngle('0', this.validator), 'HUE');
    this.setOutput(true, 'Colour');
    this.setTooltip('Paint the block with this colour.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=55');
  },
  validator: function(text) {
    // Update the current block's colour to match.
    var hue = parseInt(text, 10);
    if (!isNaN(hue)) {
      this.sourceBlock_.setColour(hue);
    }
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('colour', this.getColour());
    return container;
  },
  domToMutation: function(container) {
    this.setColour(container.getAttribute('colour'));
  }
};

/**
 * Check to see if more than one field has this name.
 * Highly inefficient (On^2), but n is small.
 * @param {!Blockly.Block} referenceBlock Block to check.
 */
function fieldNameCheck(referenceBlock) {
  if (!referenceBlock.workspace) {
    // Block has been deleted.
    return;
  }
  var name = referenceBlock.getFieldValue('FIELDNAME').toLowerCase();
  var count = 0;
  var blocks = referenceBlock.workspace.getAllBlocks();
  for (var i = 0, block; block = blocks[i]; i++) {
    var otherName = block.getFieldValue('FIELDNAME');
    if (!block.disabled && !block.getInheritedDisabled() &&
        otherName && otherName.toLowerCase() == name) {
      count++;
    }
  }
  var msg = (count > 1) ?
      'There are ' + count + ' field blocks\n with this name.' : null;
  referenceBlock.setWarningText(msg);
}

/**
 * Check to see if more than one input has this name.
 * Highly inefficient (On^2), but n is small.
 * @param {!Blockly.Block} referenceBlock Block to check.
 */
function inputNameCheck(referenceBlock) {
  if (!referenceBlock.workspace) {
    // Block has been deleted.
    return;
  }
  var name = referenceBlock.getFieldValue('INPUTNAME').toLowerCase();
  var count = 0;
  var blocks = referenceBlock.workspace.getAllBlocks();
  for (var i = 0, block; block = blocks[i]; i++) {
    var otherName = block.getFieldValue('INPUTNAME');
    if (!block.disabled && !block.getInheritedDisabled() &&
        otherName && otherName.toLowerCase() == name) {
      count++;
    }
  }
  var msg = (count > 1) ?
      'There are ' + count + ' input blocks\n with this name.' : null;
  referenceBlock.setWarningText(msg);
}

//////

/**
 * Update the language code as JavaScript.
 * @param {string} blockType Name of block.
 * @param {!Blockly.Block} rootBlock Factory_base block.
 * @return {string} Generanted language code.
 * @private
 */
function formatJavaScript_(blockType, rootBlock) {
  var code = [];
  code.push("Blockly.Blocks['" + blockType + "'] = {");
  code.push("  init: function() {");
  // Generate inputs.
  var TYPES = {'input_value': 'appendValueInput',
               'input_statement': 'appendStatementInput',
               'input_dummy': 'appendDummyInput'};
  var contentsBlock = rootBlock.getInputTargetBlock('INPUTS');
  while (contentsBlock) {
    if (!contentsBlock.disabled && !contentsBlock.getInheritedDisabled()) {
      var name = '';
      // Dummy inputs don't have names.  Other inputs do.
      if (contentsBlock.type != 'input_dummy') {
        name = escapeString(contentsBlock.getFieldValue('INPUTNAME'));
      }
      code.push('    this.' + TYPES[contentsBlock.type] + '(' + name + ')');
      var check = getOptTypesFrom(contentsBlock, 'TYPE');
      if (check) {
        code.push('        .setCheck(' + check + ')');
      }
      var align = contentsBlock.getFieldValue('ALIGN');
      if (align != 'LEFT') {
        code.push('        .setAlign(Blockly.ALIGN_' + align + ')');
      }
      var fields = getFieldsJs_(contentsBlock.getInputTargetBlock('FIELDS'));
      for (var i = 0; i < fields.length; i++) {
        code.push('        .appendField(' + fields[i] + ')');
      }
      // Add semicolon to last line to finish the statement.
      code[code.length - 1] += ';';
    }
    contentsBlock = contentsBlock.nextConnection &&
        contentsBlock.nextConnection.targetBlock();
  }
  // Generate inline/external switch.
  if (rootBlock.getFieldValue('INLINE') == 'EXT') {
    code.push('    this.setInputsInline(false);');
  } else if (rootBlock.getFieldValue('INLINE') == 'INT') {
    code.push('    this.setInputsInline(true);');
  }
  // Generate output, or next/previous connections.
  switch (rootBlock.getFieldValue('CONNECTIONS')) {
    case 'LEFT':
      code.push(connectionLineJs_('setOutput', 'OUTPUTTYPE'));
      break;
    case 'BOTH':
      code.push(connectionLineJs_('setPreviousStatement', 'TOPTYPE'));
      code.push(connectionLineJs_('setNextStatement', 'BOTTOMTYPE'));
      break;
    case 'TOP':
      code.push(connectionLineJs_('setPreviousStatement', 'TOPTYPE'));
      break;
    case 'BOTTOM':
      code.push(connectionLineJs_('setNextStatement', 'BOTTOMTYPE'));
      break;
  }
  // Generate colour.
  var colourBlock = rootBlock.getInputTargetBlock('COLOUR');
  if (colourBlock && !colourBlock.disabled) {
    var hue = parseInt(colourBlock.getFieldValue('HUE'), 10);
    if (!isNaN(hue)) {
      code.push('    this.setColour(' + hue + ');');
    }
  }
  code.push("    this.setTooltip('');");
  code.push("    this.setHelpUrl('http://www.example.com/');");
  code.push('  }');
  code.push('};');
  return code.join('\n');
}

/**
 * Create JS code required to create a top, bottom, or value connection.
 * @param {string} functionName JavaScript function name.
 * @param {string} typeName Name of type input.
 * @return {string} Line of JavaScript code to create connection.
 * @private
 */
function connectionLineJs_(functionName, typeName) {
  var type = getOptTypesFrom(getRootBlock(), typeName);
  if (type) {
    type = ', ' + type;
  } else {
    type = '';
  }
  return '    this.' + functionName + '(true' + type + ');';
}

/**
 * Returns field strings and any config.
 * @param {!Blockly.Block} block Input block.
 * @return {!Array.<string>} Field strings.
 * @private
 */
function getFieldsJs_(block) {
  var fields = [];
  while (block) {
    if (!block.disabled && !block.getInheritedDisabled()) {
      switch (block.type) {
        case 'field_static':
          // Result: 'hello'
          fields.push(escapeString(block.getFieldValue('TEXT')));
          break;
        case 'field_input':
          // Result: new Blockly.FieldTextInput('Hello'), 'GREET'
          fields.push('new Blockly.FieldTextInput(' +
              escapeString(block.getFieldValue('TEXT')) + '), ' +
              escapeString(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_number':
          // Result: new Blockly.FieldNumber(10, 0, 100, 1), 'NUMBER'
          var args = [
            Number(block.getFieldValue('VALUE')),
            Number(block.getFieldValue('MIN')),
            Number(block.getFieldValue('MAX')),
            Number(block.getFieldValue('PRECISION'))
          ];
          // Remove any trailing arguments that aren't needed.
          if (args[3] == 0) {
            args.pop();
            if (args[2] == Infinity) {
              args.pop();
              if (args[1] == -Infinity) {
                args.pop();
              }
            }
          }
          fields.push('new Blockly.FieldNumber(' + args.join(', ') + '), ' +
              escapeString(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_angle':
          // Result: new Blockly.FieldAngle(90), 'ANGLE'
          fields.push('new Blockly.FieldAngle(' +
              Number(block.getFieldValue('ANGLE')) + '), ' +
              escapeString(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_checkbox':
          // Result: new Blockly.FieldCheckbox('TRUE'), 'CHECK'
          fields.push('new Blockly.FieldCheckbox(' +
              escapeString(block.getFieldValue('CHECKED')) + '), ' +
              escapeString(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_colour':
          // Result: new Blockly.FieldColour('#ff0000'), 'COLOUR'
          fields.push('new Blockly.FieldColour(' +
              escapeString(block.getFieldValue('COLOUR')) + '), ' +
              escapeString(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_date':
          // Result: new Blockly.FieldDate('2015-02-04'), 'DATE'
          fields.push('new Blockly.FieldDate(' +
              escapeString(block.getFieldValue('DATE')) + '), ' +
              escapeString(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_variable':
          // Result: new Blockly.FieldVariable('item'), 'VAR'
          var varname = escapeString(block.getFieldValue('TEXT') || null);
          fields.push('new Blockly.FieldVariable(' + varname + '), ' +
              escapeString(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_dropdown':
          // Result:
          // new Blockly.FieldDropdown([['yes', '1'], ['no', '0']]), 'TOGGLE'
          var options = [];
          for (var i = 0; i < block.optionCount_; i++) {
            options[i] = '[' + escapeString(block.getFieldValue('USER' + i)) +
                ', ' + escapeString(block.getFieldValue('CPU' + i)) + ']';
          }
          if (options.length) {
            fields.push('new Blockly.FieldDropdown([' +
                options.join(', ') + ']), ' +
                escapeString(block.getFieldValue('FIELDNAME')));
          }
          break;
        case 'field_image':
          // Result: new Blockly.FieldImage('http://...', 80, 60, '*')
          var src = escapeString(block.getFieldValue('SRC'));
          var width = Number(block.getFieldValue('WIDTH'));
          var height = Number(block.getFieldValue('HEIGHT'));
          var alt = escapeString(block.getFieldValue('ALT'));
          fields.push('new Blockly.FieldImage(' +
              src + ', ' + width + ', ' + height + ', ' + alt + ')');
          break;
      }
    }
    block = block.nextConnection && block.nextConnection.targetBlock();
  }
  return fields;
}

/**
 * Escape a string.
 * @param {string} string String to escape.
 * @return {string} Escaped string surrouned by quotes.
 */
function escapeString(string) {
  return JSON.stringify(string);
}

/**
 * Fetch the type(s) defined in the given input.
 * Format as a string for appending to the generated code.
 * @param {!Blockly.Block} block Block with input.
 * @param {string} name Name of the input.
 * @return {?string} String defining the types.
 */
function getOptTypesFrom(block, name) {
  var types = getTypesFrom_(block, name);
  if (types.length == 0) {
    return undefined;
  } else if (types.indexOf('null') != -1) {
    return 'null';
  } else if (types.length == 1) {
    return types[0];
  } else {
    return '[' + types.join(', ') + ']';
  }
}

/**
 * Fetch the type(s) defined in the given input.
 * @param {!Blockly.Block} block Block with input.
 * @param {string} name Name of the input.
 * @return {!Array.<string>} List of types.
 * @private
 */
function getTypesFrom_(block, name) {
  var typeBlock = block.getInputTargetBlock(name);
  var types;
  if (!typeBlock || typeBlock.disabled) {
    types = [];
  } else if (typeBlock.type == 'type_other') {
    types = [escapeString(typeBlock.getFieldValue('TYPE'))];
  } else if (typeBlock.type == 'type_group') {
    types = [];
    for (var i = 0; i < typeBlock.typeCount_; i++) {
      types = types.concat(getTypesFrom_(typeBlock, 'TYPE' + i));
    }
    // Remove duplicates.
    var hash = Object.create(null);
    for (var n = types.length - 1; n >= 0; n--) {
      if (hash[types[n]]) {
        types.splice(n, 1);
      }
      hash[types[n]] = true;
    }
  } else {
    types = [escapeString(typeBlock.valueType)];
  }
  return types;
}

/**
 * Update the generator code.
 * @param {!Blockly.Block} block Rendered block in preview workspace.
 */
function updateGenerator(block) {
  function makeVar(root, name) {
    name = name.toLowerCase().replace(/\W/g, '_');
    return '  var ' + root + '_' + name;
  }
  var language = 'Javascript';
  var code = [];
  code.push("Blockly." + language + "['" + block.type +
            "'] = function(block) {");

  // Generate getters for any fields or inputs.
  for (var i = 0, input; input = block.inputList[i]; i++) {
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      var name = field.name;
      if (!name) {
        continue;
      }
      if (field instanceof Blockly.FieldVariable) {
        // Subclass of Blockly.FieldDropdown, must test first.
        code.push(makeVar('variable', name) +
                  " = Blockly." + language +
                  ".variableDB_.getName(block.getFieldValue('" + name +
                  "'), Blockly.Variables.NAME_TYPE);");
      } else if (field instanceof Blockly.FieldAngle) {
        // Subclass of Blockly.FieldTextInput, must test first.
        code.push(makeVar('angle', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (Blockly.FieldDate && field instanceof Blockly.FieldDate) {
        // Blockly.FieldDate may not be compiled into Blockly.
        code.push(makeVar('date', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (field instanceof Blockly.FieldColour) {
        code.push(makeVar('colour', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (field instanceof Blockly.FieldCheckbox) {
        code.push(makeVar('checkbox', name) +
                  " = block.getFieldValue('" + name + "') == 'TRUE';");
      } else if (field instanceof Blockly.FieldDropdown) {
        code.push(makeVar('dropdown', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (field instanceof Blockly.FieldNumber) {
        code.push(makeVar('number', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (field instanceof Blockly.FieldTextInput) {
        code.push(makeVar('text', name) +
                  " = block.getFieldValue('" + name + "');");
      }
    }
    var name = input.name;
    if (name) {
      if (input.type == Blockly.INPUT_VALUE) {
        code.push(makeVar('value', name) +
                  " = Blockly." + language + ".valueToCode(block, '" + name +
                  "', Blockly." + language + ".ORDER_ATOMIC);");
      } else if (input.type == Blockly.NEXT_STATEMENT) {
        code.push(makeVar('statements', name) +
                  " = Blockly." + language + ".statementToCode(block, '" +
                  name + "');");
      }
    }
  }
  code.push("  // TODO: Assemble " + language + " into code variable.");
  if (block.outputConnection) {
    code.push("  var code = '...';");
    code.push("  // TODO: Change ORDER_NONE to the correct strength.");
    code.push("  return [code, Blockly." + language + ".ORDER_NONE];");
  } else {
    code.push("  var code = '...\\n';");
    code.push("  return code;");
  }
  code.push("};");

  return code.join('\n');
}

function getRootBlock() {
  var blocks = window.workspace.getTopBlocks(false);
  for (var i = 0, block; block = blocks[i]; i++) {
    if (block.type == 'factory_base') {
      return block;
    }
  }
  return null;
}

// update preview and generate all code
function factoryCode () {
  var rootBlock = getRootBlock()
  var blockType = rootBlock.getFieldValue('NAME').trim().toLowerCase()
  var codeBlock = formatJavaScript_(blockType, rootBlock)
  eval(codeBlock)

  window.previewWorkspace.clear()
  var previewBlock = window.previewWorkspace.newBlock(blockType)
  previewBlock.initSvg()
  previewBlock.render()
  previewBlock.setMovable(false)
  previewBlock.setDeletable(false)
  var codeGenerator = updateGenerator(previewBlock)

  return codeBlock + '\n\n' + codeGenerator
}
