# botmodblock

Learn Computer Science through Minecraft.

# NOT AT ALL COMPLETE - STILL IN PROGRESS

This is a framework for interacting with minecraft, on the server & client side.  You can make bots that act like a player, or change how the server works. You can use [blockly](https://developers.google.com/blockly/) or javascript for both.

![screenshot](screenshot.png)

## setup

Run `npm install` to get dependencies, and `npm start` to start the local server.

### server

You will need to setup a [scriptcraft](http://scriptcraftjs.org/) server to run server-side code. [Here](https://github.com/walterhiggins/ScriptCraft/blob/master/README.md) is a great guide for getting started with that. Defintely go the canarymod route, as this code has only been tested with that (not bukkit.)

#### todo
-  [ ] get it running as standalone app in electron
-  [ ] for each callback, make a toolbox category to hold vars
-  [ ] as a demo implement [helperbot](https://www.npmjs.com/package/helperbot) in blocks
-  [ ] complete support for [mineflayer](https://github.com/PrismarineJS/mineflayer)
-  [ ] use these: mineflayer-blockfinder, mineflayer-navigate, mineflayer-scaffold
-  [ ] look at [App Inventor](http://ai2.appinventor.mit.edu/) for inspiration (especially with procedures) ([source](https://github.com/mit-cml/appinventor-sources))
-  [ ] get ideas from [modmaker](http://inspiredtoeducate.net/modmaker/)
-  [ ] add backend run support
-  [ ] reference vars for "time" blocks, so they can be canceled
-  [ ] callback arguments added to UI
-  [ ] bot block added to their own toolbox category per-bot?
-  [ ] turtle-like commands for bot
-  [ ] use `utils.val()` for every val usage
-  [X] write validation functions in `util` for in-block & top-is-bot
