# botmodblock

Learn Computer Science through Minecraft.

# NOT AT ALL COMPLETE - STILL IN PROGRESS

This is a framework for interacting with minecraft, on the server & client side.  You can make bots that do things a player can, or change how the server works. You can use [blockly](https://developers.google.com/blockly/) for both.

![screenshot](screenshot.png)

## setup

Run `npm install` to get dependencies, and `npm start` to start the local server. `npm run build` wil build the releases.

### server

You will need to setup a [scriptcraft](http://scriptcraftjs.org/) server to run server-side code. [Here](https://github.com/walterhiggins/ScriptCraft/blob/master/README.md) is a great guide for getting started with that. Defintely go the canarymod route, as this code has only been tested with that (not bukkit.) Use version 1.8 so bots will work.



#### todo
-  [X] get it running as standalone app in electron
-  [ ] as a demo implement [helperbot](https://www.npmjs.com/package/helperbot) in blocks
-  [ ] complete support for [mineflayer](https://github.com/PrismarineJS/mineflayer)
-  [ ] use these: mineflayer-blockfinder, mineflayer-navigate, mineflayer-scaffold
-  [ ] look at [App Inventor](http://ai2.appinventor.mit.edu/) for inspiration (especially with procedures) ([source](https://github.com/mit-cml/appinventor-sources))
-  [ ] get ideas from [modmaker](http://inspiredtoeducate.net/modmaker/)
-  [X] add backend run support
-  [ ] reference vars for "time" blocks, so they can be canceled
-  [ ] callback arguments added to UI
-  [ ] turtle-like commands for bot
-  [ ] use `utils.val()` for every val usage
-  [X] write validation functions in `util` for in-block & top-is-bot
-  [ ] add blockfactory back so I can open/save source for blocks
-  [ ] improve run error-handling & timeout
