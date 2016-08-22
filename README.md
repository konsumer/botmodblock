# botmodblock

Learn Computer Science through Minecraft.

# NOT AT ALL COMPLETE - STILL IN PROGRESS

This is a framework for interacting with minecraft, on the server & client side.  You can make bots that do things a player can, or change how the server works. You can use [blockly](https://developers.google.com/blockly/) for both.

![screenshot](screenshot.png)

## usage

Right now, it only has the beginnings of bot support. You can open/save XML files that represent the block diagrams, and you can view/run generated code. Once I finish the bot support, I'll add some cool examples to make it easier to get started.

## development

Run `npm install` to get dependencies, and `npm start` to start the local server. `npm run build` wil build the releases.

### minecraft server

You will need to setup a [scriptcraft](http://scriptcraftjs.org/) server to run server-side code. [Here](https://github.com/walterhiggins/ScriptCraft/blob/master/README.md) is a great guide for getting started with that. Defintely go the canarymod route, as this code has only been tested with that (not bukkit.) Use version 1.8 so bots will work.



#### todo
-  [X] get it running as standalone app in electron
-  [ ] as a demo implement [helperbot](https://www.npmjs.com/package/helperbot) in blocks
-  [ ] as a demo imlement [rbot](https://github.com/rom1504/rbot) in blocks
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
-  [ ] look at [code studio](https://studio.code.org) for inspiration. I like what they do with callbacks in flappybird
-  [ ] improve run error-handling & timeout
-  [ ] seperate build into sub-project & use prune option for electron-packager
-  [ ] use electron-packager ignore to get node_modules down to the bare minimum
-  [ ] figure out branding
-  [ ] auto-update code window
-  [ ] follow ideas [here](https://www.youtube.com/watch?v=H4sSldXv_S4) to make better editor, 2-way block/code, helpful hints & challenge framework & safer server-side thread (detect endless loops, etc)
