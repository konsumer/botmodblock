// generate XML for data widgets. should use data module....

var mineflayer = require('mineflayer')
var fs = require('fs')

var blocks = Object.keys(mineflayer.blocks).map(function(i){
    return [ mineflayer.blocks[i].displayName, mineflayer.blocks[i].id ]
})

fs.writeFile(__dirname + '/../saved/data_block.xml', `<?xml version="1.0" encoding="UTF-8"?>
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="factory_base" id="KeFSz*cyn|W)k[5BRqYC" deletable="false" movable="false" x="0" y="0">
    <mutation connections="LEFT" />
    <field name="NAME">data_block</field>
    <field name="INLINE">AUTO</field>
    <field name="CONNECTIONS">LEFT</field>
    <statement name="INPUTS">
      <block type="input_dummy" id=":JDy?V3Yb/2MR+Y_0q],">
        <field name="ALIGN">LEFT</field>
        <statement name="FIELDS">
          <block type="field_static" id="5s#r\`;Xy@nI5;Feb,I[Y">
            <field name="TEXT">block</field>
            <next>
              <block type="field_dropdown" id="pfx+fm,![}(*DwJ#52eM">
                <mutation options="${blocks.length}" />
                <field name="FIELDNAME">VALUE</field>
                ${blocks.map((b,i) =>{ return '<field name="USER'+i+'">'+b[0]+'</field>\n<field name="CPU'+i+'">'+b[1]+'</field>' }).join('\n')}
              </block>
            </next>
          </block>
        </statement>
      </block>
    </statement>
    <value name="OUTPUTTYPE">
      <block type="type_number" id="ZBo46jJ3hxv(|xIg7aJ|" />
    </value>
  </block>
</xml>`)

var instruments = Object.keys(mineflayer.instruments).map(function(i){
    return [ mineflayer.instruments[i].name, mineflayer.instruments[i].id ]
})

fs.writeFile(__dirname + '/../saved/data_instrument.xml', `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="factory_base" id="KeFSz*cyn|W)k[5BRqYC" deletable="false" movable="false" x="0" y="0"><mutation connections="LEFT"></mutation><field name="NAME">data_instrument</field><field name="INLINE">AUTO</field><field name="CONNECTIONS">LEFT</field><statement name="INPUTS"><block type="input_dummy" id=":JDy?V3Yb/2MR+Y_0q],"><field name="ALIGN">LEFT</field><statement name="FIELDS"><block type="field_static" id="5s#r\`;Xy@nI5;Feb,I[Y"><field name="TEXT">instrument</field><next><block type="field_dropdown" id="pfx+fm,![}(*DwJ#52eM"><mutation options="${instruments.length}"></mutation><field name="FIELDNAME">value</field>${instruments.map((instrument, i) => { return '<field name="USER'+i+'">'+instrument[0]+'</field><field name="CPU'+i+'">'+instrument[1]+'</field>' }).join('')} </block></next></block></statement></block></statement><value name="OUTPUTTYPE"><block type="type_number" id="ZXf#/=ql-vl+\`[IlC4Mr"></block></value></block></xml>`)

var items = Object.keys(mineflayer.items).map(function(i){
    return [ mineflayer.items[i].displayName, mineflayer.items[i].id ]
})

fs.writeFile(__dirname + '/../saved/data_item.xml', `<?xml version="1.0" encoding="UTF-8"?>
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="factory_base" id="KeFSz*cyn|W)k[5BRqYC" deletable="false" movable="false" x="0" y="0">
    <mutation connections="LEFT" />
    <field name="NAME">data_item</field>
    <field name="INLINE">AUTO</field>
    <field name="CONNECTIONS">LEFT</field>
    <statement name="INPUTS">
      <block type="input_dummy" id=":JDy?V3Yb/2MR+Y_0q],">
        <field name="ALIGN">LEFT</field>
        <statement name="FIELDS">
          <block type="field_static" id="5s#r\`;Xy@nI5;Feb,I[Y">
            <field name="TEXT">item</field>
            <next>
              <block type="field_dropdown" id="pfx+fm,![}(*DwJ#52eM">
                <mutation options="${items.length}" />
                <field name="FIELDNAME">value</field>
                ${items.map((item, i) => { return '<field name="USER'+i+'">'+item[0]+'</field><field name="CPU'+i+'">'+item[1]+'</field>' })}
              </block>
            </next>
          </block>
        </statement>
      </block>
    </statement>
    <value name="OUTPUTTYPE">
      <block type="type_number" id="E!xRT+4ipaV9o.5hmav:" />
    </value>
  </block>
</xml>`)


