Require("class.js");

var GameJS = Class(object,
                   {
                       onCreate: function () {
                           print("Create Game js");
                           this.js_Game = null;
                           this.js_Scene = null;
                           this.loadJS();
                           this.init();
                           this.run();

                       },
                       init: function () {
                           print("init main js");
                           this.js_Game = new Game();
                           this.js_Game.setInterfaceOrientation(3);
                           this.js_Game.setEnableRetinaDisplay(false);
                           this.js_Game.setDisplayStats(true);
                           this.js_Game.setDesignResolutionSize(480, 320, 1);
                           this.js_Game.initialize();
                           print("init gamemap");
                           this.js_Scene = this.js_Game.createSceneWithJson("gamemap.json");
                           this.js_Scene.onEnter = this.onEnter;
                           this.js_Scene.onExit = this.onExit;
                           this.js_Game.update = this.frame;
                           LoadGameObjectTemplateFile("sprites.json");
                           LoadGameObjectTemplateFile("towers.json");
                           LoadGameObjectTemplateFile("selectedFrameAni.json");
                           print("init main js over");
                       },

                       run: function () {
                           this.js_Game.runWithScene(this.js_Scene);
                           this.js_Game.setAnimationInterval(1.0 / 60);
                           this.js_Game.run();
                       },
                       loadJS: function () {
                           print("require js");
                           Require("gamemap.js");
                           Require("uibuild.js");
                           Require("tower.js");
                           print("require js over");
                       },
                       frame: function () {
                       },
                       onEnter: function () {
                           print("scene enter");

                           var scene = new gamemap(10000);
                           print("scene " + scene);
                       },
                       onExit: function () {

                       }
                   });

var game = new GameJS();