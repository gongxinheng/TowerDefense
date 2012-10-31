
var helloworld = Class(object, {
    onCreate: function (objectTag) {

        //ui
        var ui = GetSubComponent(objectTag, "ui");
        print("ddfdf   " + ui);
        var backButton = ui.getNodeByName("exit");
        backButton.onClick = function () {
            game.js_Game.exit();
        }

        print("!!!!!!!!!!!!");
        var sprites = CreateGameObjectFromTemplate("sprites");
        //var aniEnemydie = sprites.getComponentJS("enemydie");
        //aniEnemydie.setAction(0);
        var root = GetRootGameObj();
        root.addChild(sprites);
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