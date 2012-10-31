
var gamemap = Class(object, {
    onCreate: function (objectTag) {

        //ui
        //var ui = GetSubComponent(objectTag, "ui");
        //print("ddfdf   " + ui);
        //var backButton = ui.getNodeByName("exit");
        //        backButton.onClick = function () {
        //            game.js_Game.exit();
        //        }

        print("!!!!!!!!!!!!");
        this.sprites = CreateGameObjectFromTemplate("sprites");
        this.towers = CreateGameObjectFromTemplate("towers");
        //var aniEnemydie = sprites.getComponentJS("enemydie");
        //aniEnemydie.setAction(0);
        var root = GetRootGameObj();
        root.addChild(this.sprites);

        var input = GetSubComponent(10001, "locationinput");
        //var bg = getComponentJS("backgroud");
        print(input);
        //var input = bg.getNodeByName("locationinput");
        var self = this;
        input.MultiTouchPressed = function (touches) {
            self.multiTouchPressed(touches);
        }
        input.TouchPressed = function (x, y) {
            self.singleTouchPressed(x, y);
        }
    },

    multiTouchPressed: function (touches) {
        print("multiTouchPressed");
    },

    singleTouchPressed: function (x, y) {
        print("x=" + x + "y=" + y);
        var root = GetRootGameObj();
        print("ccccccccccc");
        var towers = CreateGameObjectFromTemplate("towers");
        var tower = towers.getComponentJS("guntower");
        print(tower);
        tower.setAction(0);
        root.addChild(towers);
        print("fasfsdafff");
        var pos = new GLKVector4();
        pos.x = x;
        pos.y = y;
        tower.setPosition(pos);
    }
});


//var SpritEnemyDie = Class(object,
//                          {
//                              onCreate: function (objectTag, strName) {
//                                  var self = this;
//                                  //gets componet
//                                  //                                  var com = GetSubComponent(objectTag, strName);

//                                  //                                  //gets GUI element
//                                  //                                  var leftButton = com.getNodeByName("left");
//                                  //                                  var rightButton = com.getNodeByName("right");
//                                  //                                  var backButton = com.getNodeByName("back");

//                                  //                                  //register callback function
//                                  //                                  leftButton.onClick = function () {
//                                  //                                      self.prev(self);
//                                  //                                  }
//                                  //                                  rightButton.onClick = function () {
//                                  //                                      self.next(self);
//                                  //                                  }
//                                  //                                  backButton.onClick = function () {
//                                  //                                      self.back(self);
//                                  //                                  }
//                                  print("!!!!!!!!!!!!");
//                                  var sprites = CreateGameObjectFromTemplate("sprites");
//                                  var aniEnemydie = sprites.getComponentJS("enemydie");
//                                  aniEnemydie.action();
//                              },
//                              sceneOnEnter: function () {
//                              },
//                              sceneOnExit: function () {
//                                  print("spriteenemydie exit");
//                                  game.js_Game.removeSceneWithName("sprite_1");
//                              }
//                          });