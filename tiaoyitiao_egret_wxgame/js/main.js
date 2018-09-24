var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ui;
(function (ui) {
    var BaseGameScene = (function (_super) {
        __extends(BaseGameScene, _super);
        function BaseGameScene() {
            return _super.call(this) || this;
        }
        return BaseGameScene;
    }(eui.Component));
    ui.BaseGameScene = BaseGameScene;
    __reflect(BaseGameScene.prototype, "ui.BaseGameScene");
})(ui || (ui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var game_layer, message_container;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        GameUtils.stage = this.stage;
                        game_layer = new egret.DisplayObjectContainer();
                        this.addChild(game_layer);
                        ui.PanelManager.instance.setContainer(game_layer);
                        message_container = new egret.DisplayObjectContainer();
                        this.addChild(message_container);
                        ui.PanelManager.instance.setMessageContainer(message_container);
                        ui.PanelManager.instance.showStartPanel();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var ui;
(function (ui) {
    var BlockObject = (function (_super) {
        __extends(BlockObject, _super);
        function BlockObject() {
            var _this = _super.call(this) || this;
            _this.res_keys = ["block1_png", "block2_png", "block3_png"];
            _this.skinName = "block";
            _this.center = new egret.DisplayObject();
            _this.center.x = (_this.node1.x + _this.node3.x) / 2;
            _this.center.y = (_this.node2.y + _this.node4.y) / 2 + 20;
            _this.addChild(_this.center);
            // console.log(this.center.x, this.center.y);
            _this.radio_right = (_this.node3.y - _this.node4.y) / (_this.node3.x - _this.node4.x);
            _this.radio_left = (_this.node1.y - _this.node4.y) / (_this.node1.x - _this.node4.x);
            _this.label_index.visible = false;
            _this.reUse();
            return _this;
        }
        BlockObject.prototype.setIndex = function (index) {
            this.label_index.visible = true;
            this.label_index.text = index.toString();
        };
        BlockObject.prototype.getNodeGlobalPoint = function (displayObject) {
            var tempPoint = new egret.Point();
            displayObject.parent.localToGlobal(displayObject.x, displayObject.y, tempPoint);
            return tempPoint;
        };
        BlockObject.prototype.getNodeLocalPoint = function (container, globalPoint) {
            var tempPoint = new egret.Point();
            container.globalToLocal(globalPoint.x, globalPoint.y, tempPoint);
            return tempPoint;
        };
        BlockObject.prototype.getNode1GlobalPoint = function () {
            return this.getNodeGlobalPoint(this.node1);
        };
        BlockObject.prototype.getNode2GlobalPoint = function () {
            return this.getNodeGlobalPoint(this.node2);
        };
        BlockObject.prototype.getNode3GlobalPoint = function () {
            return this.getNodeGlobalPoint(this.node3);
        };
        BlockObject.prototype.getNode4GlobalPoint = function () {
            return this.getNodeGlobalPoint(this.node4);
        };
        BlockObject.prototype.getCenterGlobalPoint = function () {
            return this.getNodeGlobalPoint(this.center);
        };
        BlockObject.prototype.getLeftTopGlobalPoint = function () {
            var tempPoint = new egret.Point();
            this.localToGlobal(0, 0, tempPoint);
            return tempPoint;
        };
        BlockObject.prototype.isInLeft = function () {
            var block_center_x = this.width;
            var block_center_y = this.height / 2;
            var tempPoint = new egret.Point();
            this.localToGlobal(block_center_x, block_center_y, tempPoint);
            return tempPoint.x < GameUtils.stage.stageWidth / 2;
        };
        BlockObject.prototype.getValidWidth = function () {
            return this.node3.x - this.node1.x;
        };
        BlockObject.prototype.TestBounds = function () {
            var test_names = ["node5", "node6", "node7", "node8", "node9"];
            for (var index in test_names) {
                var name_1 = test_names[index];
                var child = this[name_1];
                var isHit = GameUtils.getInstance().isInBound(new egret.Point(child.x, child.y));
                console.log("is hit", isHit, name_1);
            }
        };
        //角色是否在中间的区域
        BlockObject.prototype.getPlayerScore = function () {
            var global_player_point = GameUtils.getPlayerGlobalPoint();
            var global_block_center_point = this.getCenterGlobalPoint();
            if (Math.abs(global_block_center_point.x - global_player_point.x) <= 10 && Math.abs(global_block_center_point.y - global_player_point.y) <= 10) {
                return 10;
            }
            if (Math.abs(global_block_center_point.x - global_player_point.x) <= 20 && Math.abs(global_block_center_point.y - global_player_point.y) <= 20) {
                return 8;
            }
            if (Math.abs(global_block_center_point.x - global_player_point.x) <= 30 && Math.abs(global_block_center_point.y - global_player_point.y) <= 30) {
                return 6;
            }
            return 5;
        };
        BlockObject.prototype.reUse = function () {
            var name_index = Math.floor(Math.random() * this.res_keys.length);
            var name = this.res_keys[name_index];
            this.img.texture = RES.getRes(name);
        };
        BlockObject.prototype.changeGrayColor = function () {
            var name_index = 2;
            var name = this.res_keys[name_index];
            this.img.texture = RES.getRes(name);
        };
        BlockObject.prototype.remove = function () {
            this.parent.removeChild(this);
        };
        return BlockObject;
    }(eui.Component));
    ui.BlockObject = BlockObject;
    __reflect(BlockObject.prototype, "ui.BlockObject");
})(ui || (ui = {}));
var GameController = (function () {
    function GameController() {
        this.max_block_in_use = 3;
        this._blockCaches = [];
        this._pushSound = null;
        this._pushSoundChannel = null;
        this._jumpSound = null;
        this._jumpSoundChannel = null;
        this.start_play_time = 0;
    }
    Object.defineProperty(GameController, "instance", {
        get: function () {
            if (!GameController._instance) {
                GameController._instance = new GameController();
            }
            return GameController._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameController.prototype.setMaxBlockInUse = function (max_number) {
        this.max_block_in_use = max_number;
    };
    GameController.prototype.setMainGameScene = function (mainScene) {
        this.mainScene = mainScene;
    };
    GameController.prototype.getCurrentBlock = function () {
        return this.mainScene.current_block;
    };
    GameController.prototype.getNextBlock = function () {
        return this.mainScene.next_block;
    };
    GameController.prototype.createBlock = function (curstom_container) {
        if (curstom_container === void 0) { curstom_container = null; }
        var new_block = new ui.BlockObject();
        curstom_container = curstom_container ? curstom_container : this.mainScene.block_container;
        curstom_container.addChildAt(new_block, 1);
        this.pushBlock(new_block);
        return new_block;
    };
    GameController.prototype.pushBlock = function (new_block) {
        this._blockCaches.push(new_block);
        if (this._blockCaches.length > GameController.instance.max_block_in_use) {
            var first_block = this._blockCaches.shift();
            first_block.remove();
        }
    };
    GameController.prototype.getAllBlocks = function () {
        return this._blockCaches;
    };
    GameController.prototype.generateNextBlock = function (scale_block) {
        if (scale_block === void 0) { scale_block = 1; }
        var new_block = this.createBlock();
        new_block.scaleX = new_block.scaleY = scale_block;
        var random_x = 0;
        var random_y = 0;
        var random_is_left = Math.floor(Math.random() * 2) == 0;
        if (this.mainScene.is_first_start) {
            random_is_left = false;
        }
        random_x = Math.floor(Math.random() * (GameConfig.max_random_x - GameConfig.min_random_x) + GameConfig.min_random_x) * scale_block;
        if (random_is_left) {
            random_x *= -1;
        }
        if (random_is_left) {
            random_y = GameConfig.slope_rate_left * random_x;
        }
        else {
            random_y = GameConfig.slope_rate_right * random_x;
        }
        var next_x = this.getCurrentBlock().x + random_x;
        var next_y = this.getCurrentBlock().y + random_y;
        new_block.x = next_x;
        new_block.y = next_y;
        return new_block;
    };
    GameController.prototype.generateSimulateBlock = function (lastX, lastY, is_twice) {
        if (lastX === void 0) { lastX = 0; }
        if (lastY === void 0) { lastY = 0; }
        if (is_twice === void 0) { is_twice = false; }
        var scale = 0.6;
        var blocks = [];
        var random_x = 0;
        var random_y = 0;
        var random_is_left = false;
        if (this.mainScene.is_first_start) {
            random_is_left = false;
        }
        random_x = GameConfig.min_simulate_random_x * scale * 0.7;
        random_y = GameConfig.slope_rate_right * random_x;
        var next_x = 0;
        var next_y = 0;
        if (lastX != 0 || lastY != 0) {
            next_x = lastX + random_x;
            next_y = lastY + random_y;
        }
        else {
            next_x = GameConfig.default_simulate_init_block_x;
            next_y = GameConfig.default_simulate_init_block_y;
        }
        if (is_twice) {
            // random_x = 200 * scale * 0.7
            random_y = GameConfig.slope_rate_left * random_x;
        }
        var block_count = is_twice ? 2 : 1;
        for (var block_index = block_count - 1; block_index >= 0; block_index--) {
            if (block_count == 2) {
                var temp = 1;
            }
            var new_block = this.createBlock();
            new_block.scaleX = new_block.scaleY = scale;
            new_block.x = next_x;
            new_block.y = next_y;
            new_block.x += (block_index - (block_count - 1) / 2) * random_x;
            new_block.y += (block_index - (block_count - 1) / 2) * random_y;
            blocks.push(new_block);
        }
        return blocks;
    };
    //自动调整所有节点容器的位置，可理解为移动摄像头，调整聚焦位置
    //保持当前block和下一个block的中点在屏幕中间
    GameController.prototype.moveCarmera = function () {
        var current_block = this.getCurrentBlock();
        var next_block = this.getNextBlock();
        var center_x = (current_block.x + next_block.x) / 2 + current_block.width / 2;
        var center_y = (current_block.y + next_block.y) / 2 + current_block.height / 2;
        var global_center_point = GameUtils.convertLocalPointInNode2GlobalPoint(this.mainScene.block_container, center_x, center_y);
        var delta_x = GameUtils.stage.stageWidth / 2 - global_center_point.x;
        var delta_y = GameUtils.stage.stageHeight / 2 - global_center_point.y;
        //准备状态下，不需要有移动效果，直接设置位置
        if (this.isInFirstReadyState()) {
            this.mainScene.is_first_start = false;
            this.mainScene.move_container.x += delta_x;
            this.mainScene.move_container.y += delta_y;
        }
        else {
            GameUtils.tweenMoveBy(this.mainScene.move_container, delta_x, delta_y, 0.5 * 1000);
            var cur_y = this.mainScene.next_block.y;
            this.mainScene.next_block.y -= 200;
            var __this = this;
            GameUtils.tweenBounceUp(next_block, next_block.y + 200, 100, 0.2 * 1000, 0.1 * 1000);
        }
    };
    //是否在准备状态
    //准备状态下，块生成时，不需要有弹起的效果；初始的两个块出现不需要移动摄像头位置。
    GameController.prototype.isInFirstReadyState = function () {
        return this.mainScene.is_first_start;
    };
    GameController.prototype.clear = function () {
        this._blockCaches = [];
    };
    GameController.prototype.playPushSound = function () {
        if (!this._pushSound) {
            this._pushSound = RES.getRes("push_mp3");
        }
        if (this._jumpSoundChannel) {
            this._jumpSoundChannel.stop();
        }
        this._pushSoundChannel = this._pushSound.play(0, 1);
    };
    GameController.prototype.playJumpSound = function () {
        if (!this._jumpSound) {
            this._jumpSound = RES.getRes("jump_mp3");
        }
        if (this._pushSoundChannel) {
            this._pushSoundChannel.stop();
        }
        this._jumpSoundChannel = this._jumpSound.play(0, 1);
    };
    GameController._instance = null;
    return GameController;
}());
__reflect(GameController.prototype, "GameController");
var ui;
(function (ui) {
    var GameOverTips = (function (_super) {
        __extends(GameOverTips, _super);
        function GameOverTips(score) {
            var _this = _super.call(this) || this;
            _this.skinName = "GameOver_Tips";
            _this.btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            _this.label_score.text = "积分：" + score;
            var save_func = function () {
                wx.setStorage({ key: "my_score", data: score });
                var end_time = new Date().getSeconds();
                var KVDataList = [{
                        key: "",
                        value: ""
                    }];
                KVDataList[0].key = "tiaoyitiao_score";
                KVDataList[0].value = JSON.stringify({
                    "wxgame": {
                        "score": score,
                        "update_time": new Date().getSeconds()
                    },
                    "cost_ms": end_time - GameController.instance.start_play_time
                });
                platform.setUserCloudStorage(KVDataList);
            };
            if (typeof wx == "object") {
                wx.getStorage({
                    key: 'my_score',
                    fail: function (res) {
                        save_func();
                    },
                    success: function (res) {
                        // console.log(res.data)
                        if (!res.data || score > res.data) {
                            save_func();
                        }
                    }
                });
            }
            return _this;
        }
        GameOverTips.prototype.onTouchTap = function (event) {
            this.parent.removeChild(this);
            GameUtils.mainGameScene.close();
            ui.PanelManager.instance.showStartPanel();
            // GameUtils.mainGameScene.restartGame();
        };
        return GameOverTips;
    }(eui.Component));
    ui.GameOverTips = GameOverTips;
    __reflect(GameOverTips.prototype, "ui.GameOverTips");
})(ui || (ui = {}));
var JUMP_RESULT;
(function (JUMP_RESULT) {
    JUMP_RESULT[JUMP_RESULT["FAIL"] = 0] = "FAIL";
    JUMP_RESULT[JUMP_RESULT["THIS_BLOCK"] = 1] = "THIS_BLOCK";
    JUMP_RESULT[JUMP_RESULT["NEXT_BLOCK"] = 2] = "NEXT_BLOCK";
})(JUMP_RESULT || (JUMP_RESULT = {}));
;
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.default_init_player_x = -80;
    GameConfig.default_init_player_y = 816;
    GameConfig.slope_rate_right = -0.5783;
    GameConfig.slope_rate_left = 0.5729;
    GameConfig.min_random_x = 220;
    GameConfig.max_random_x = 300;
    GameConfig.min_simulate_random_x = 200;
    GameConfig.default_simulate_init_player_x = 56;
    GameConfig.default_simulate_init_player_y = 878;
    GameConfig.default_simulate_init_block_x = 32;
    GameConfig.default_simulate_init_block_y = 702;
    GameConfig.push_down_acce = 40; //下压加速度
    GameConfig.gravity_acce = 10; //重力加速度
    GameConfig.move_speed_distance = 50; //移动的速度
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
var GameUtils = (function () {
    function GameUtils() {
        this.line_infos = null;
        this.line_points = null;
        this.init();
    }
    GameUtils.getInstance = function () {
        if (GameUtils._instance == null) {
            GameUtils._instance = new GameUtils();
        }
        return GameUtils._instance;
    };
    GameUtils.prototype.init = function () {
        var new_block = new ui.BlockObject();
        this.setBounds(new egret.Point(new_block.node1.x, new_block.node1.y), new egret.Point(new_block.node2.x, new_block.node2.y), new egret.Point(new_block.node3.x, new_block.node3.y), new egret.Point(new_block.node4.x, new_block.node4.y));
    };
    GameUtils.prototype.setBounds = function (point1, point2, point3, point4) {
        this.line_infos = new Array();
        this.line_points = new Array();
        this.line_points.push(point1);
        this.line_points.push(point2);
        this.line_points.push(point3);
        this.line_points.push(point4);
        var line_info = new egret.Point();
        line_info.x = (point1.y - point2.y) / (point1.x - point2.x);
        line_info.y = point1.y - line_info.x * point1.x;
        this.line_infos.push(line_info);
        line_info = new egret.Point();
        line_info.x = (point2.y - point3.y) / (point2.x - point3.x);
        line_info.y = point2.y - line_info.x * point2.x;
        this.line_infos.push(line_info);
        line_info = new egret.Point();
        line_info.x = (point3.y - point4.y) / (point3.x - point4.x);
        line_info.y = point3.y - line_info.x * point3.x;
        this.line_infos.push(line_info);
        line_info = new egret.Point();
        line_info.x = (point4.y - point1.y) / (point4.x - point1.x);
        line_info.y = point4.y - line_info.x * point4.x;
        this.line_infos.push(line_info);
    };
    GameUtils.prototype.getYInLineIndex = function (x, line_index) {
        return this.line_infos[line_index].x * x + this.line_infos[line_index].y;
    };
    GameUtils.prototype.isInBound = function (point) {
        var line_index_array = new Array();
        var has_cache = {};
        var except_line_index_array = new Array();
        for (var line_Index = 0; line_Index < this.line_infos.length; line_Index++) {
            if (except_line_index_array.indexOf(line_Index) != -1) {
                continue;
            }
            var temp_point_1 = this.line_points[line_Index];
            var temp_point_2 = this.line_points[(line_Index + 1) % this.line_infos.length];
            var min_x = Math.min(temp_point_1.x, temp_point_2.x);
            var max_x = Math.max(temp_point_1.x, temp_point_2.x);
            if (point.x > min_x && point.x < max_x) {
                line_index_array.push(line_Index);
            }
            else if (point.x == min_x || point.x == max_x) {
                if (!has_cache[point.x]) {
                    line_index_array.push(line_Index);
                    has_cache[point.x] = line_Index;
                    if (point.x == temp_point_1.x) {
                        except_line_index_array.push((line_Index - 1 + this.line_infos.length) % this.line_infos.length);
                    }
                    else {
                        except_line_index_array.push((line_Index + 1) % this.line_infos.length);
                    }
                }
                else {
                    egret.error("can not come here....1");
                }
            }
        }
        if (line_index_array.length < 2) {
            return false;
        }
        if (line_index_array.length > 2) {
            egret.error("can not come here....2");
            return false;
        }
        var y_line_index_1 = this.getYInLineIndex(point.x, line_index_array[0]);
        var y_line_index_2 = this.getYInLineIndex(point.x, line_index_array[1]);
        var y_max_in_2_3 = Math.max(y_line_index_1, y_line_index_2);
        var y_min_in_2_3 = Math.min(y_line_index_1, y_line_index_2);
        return point.y >= y_min_in_2_3 && point.y <= y_max_in_2_3;
    };
    GameUtils.getNodeGlobalPoint = function (display_object) {
        var tempPoint = new egret.Point();
        display_object.parent.localToGlobal(display_object.x, display_object.y, tempPoint);
        return tempPoint;
    };
    //获取角色的全局位置
    GameUtils.getPlayerGlobalPoint = function () {
        return this.getNodeGlobalPoint(GameController.instance.mainScene.player);
    };
    //转换全局坐标成角色的本地坐标
    GameUtils.convertGlobalPoint2PlayerLocalPoint = function (globalX, globalY) {
        var tempPoint = new egret.Point();
        var player = GameController.instance.mainScene.player;
        player.parent.globalToLocal(globalX, globalY, tempPoint);
        return tempPoint;
    };
    //某个对象的局部坐标转换成全局坐标
    GameUtils.convertLocalPointInNode2GlobalPoint = function (displayObject, localX, localY) {
        var tempPoint = new egret.Point();
        displayObject.localToGlobal(localX, localY, tempPoint);
        return tempPoint;
    };
    //某个点是不是在当前的块上
    GameUtils.isPointInCurrentBlock = function (global_point_x, global_point_y) {
        var local_in_curr_block = GameController.instance.getCurrentBlock().globalToLocal(global_point_x, global_point_y);
        var is_in_current_block_bound = GameUtils.getInstance().isInBound(local_in_curr_block);
        return is_in_current_block_bound;
    };
    //某个点是不是在下一个块上
    GameUtils.isPointInNextBlock = function (global_point_x, global_point_y) {
        var local_in_next_block = GameController.instance.getNextBlock().globalToLocal(global_point_x, global_point_y);
        var is_in_next_block_bound = GameUtils.getInstance().isInBound(local_in_next_block);
        return is_in_next_block_bound;
    };
    //某个点是不是在有效的块上（当前块和下一个块）。
    //为了得到具体信息，这里返回具体数值，而不是返回boolean，这样业务可以根据返回值去处理。
    GameUtils.isPointOnBlock = function (global_point_x, global_point_y) {
        var is_in_current_block_bound = GameUtils.isPointInCurrentBlock(global_point_x, global_point_y);
        var is_in_next_block_bound = GameUtils.isPointInNextBlock(global_point_x, global_point_y);
        if (!is_in_current_block_bound && !is_in_next_block_bound) {
            return JUMP_RESULT.FAIL;
        }
        if (is_in_current_block_bound) {
            return JUMP_RESULT.THIS_BLOCK;
        }
        if (is_in_next_block_bound) {
            return JUMP_RESULT.NEXT_BLOCK;
        }
    };
    /**
     * displayObject：需要移动的对象
     * target_x：目标x值
     * target_y：目标y值
     * time：移动时间
     * effect：移动效果
     * callback：回调
     * callbackThis：回调的对象
     */
    GameUtils.tweenMoveTo = function (displayObject, target_x, target_y, time, effect, callback, callbackThis) {
        if (effect === void 0) { effect = null; }
        if (callback === void 0) { callback = null; }
        if (callbackThis === void 0) { callbackThis = null; }
        var tween = egret.Tween.get(displayObject);
        tween.to({ x: target_x, y: target_y }, time, effect).call(function () {
            if (callback) {
                callback.apply(callbackThis);
            }
        });
    };
    GameUtils.tweenMoveBy = function (displayObject, target_x, target_y, time, effect, callback, callbackThis) {
        if (effect === void 0) { effect = null; }
        if (callback === void 0) { callback = null; }
        if (callbackThis === void 0) { callbackThis = null; }
        GameUtils.tweenMoveTo(displayObject, displayObject.x + target_x, displayObject.y + target_y, time, effect, callback, callbackThis);
    };
    /**
     * displayObject:需要移动的对象
     * target_y：目标y值
     * up_height：弹起来的高度
     * down_time：下移的时间
     * bounce_time：弹起的时间
     * callback：回调
     * callbackThis：回调的对象
     */
    GameUtils.tweenBounceUp = function (displayObject, target_y, up_height, down_time, bounce_time, callback, callbackThis) {
        if (callback === void 0) { callback = null; }
        if (callbackThis === void 0) { callbackThis = null; }
        var block_tween = egret.Tween.get(displayObject);
        block_tween.to({ y: target_y }, down_time, egret.Ease.sineIn)
            .to({ y: target_y - up_height }, bounce_time, egret.Ease.sineOut)
            .to({ y: target_y }, bounce_time, egret.Ease.sineIn)
            .call(function () {
            if (callback) {
                callback.apply(callbackThis);
            }
        });
    };
    GameUtils.tweenRotate = function (displayObject, rotation, rotation_time, ease, callback, callbackThis) {
        if (ease === void 0) { ease = null; }
        if (callback === void 0) { callback = null; }
        if (callbackThis === void 0) { callbackThis = null; }
        var rotate_tween = egret.Tween.get(displayObject);
        rotate_tween.to({ rotation: rotation }, rotation_time, ease)
            .call(function () {
            if (callback) {
                callback.apply(callbackThis);
            }
        });
    };
    GameUtils.tweenScaleTo = function (displayObject, target_scaleX, target_scaleY, time, ease, callback, callbackThis) {
        if (ease === void 0) { ease = null; }
        if (callback === void 0) { callback = null; }
        if (callbackThis === void 0) { callbackThis = null; }
        var tween = egret.Tween.get(displayObject);
        tween.to({ scaleX: target_scaleX, scaleY: target_scaleY }, time, ease)
            .call(function () {
            if (callback) {
                callback.apply(callbackThis);
            }
        });
    };
    /**
     * 按下按钮，角色的动画效果
     */
    GameUtils.tweenPushPlayerDownEffect = function (callback, callbackThis) {
        if (callback === void 0) { callback = null; }
        if (callbackThis === void 0) { callbackThis = null; }
        var move_tween2 = egret.Tween.get(GameController.instance.mainScene.player);
        move_tween2.to({ scaleX: 1.3, scaleY: 0.7 }, 0.08 * 1000, egret.Ease.sineIn)
            .to({ scaleX: 1, scaleY: 1 }, 0.05 * 1000).call(function () {
            if (callback) {
                callback.apply(callbackThis);
            }
        });
    };
    GameUtils.calcPlayerRotationIfJumpFail = function (player_target_x, player_target_y, dict_right) {
        var is_left_on_block = GameUtils.isPointOnBlock(player_target_x - 24, player_target_y) != JUMP_RESULT.FAIL; //左边有没有停在block上面
        var is_right_on_block = GameUtils.isPointOnBlock(player_target_x + 24, player_target_y) != JUMP_RESULT.FAIL; //右边
        var _rotation = 0;
        if (dict_right) {
            if (!is_left_on_block && is_right_on_block) {
                _rotation = -110;
            }
            else if (is_left_on_block && !is_right_on_block) {
                _rotation = 70;
            }
        }
        else {
            if (is_left_on_block && !is_right_on_block) {
                _rotation = 110;
            }
            else if (is_right_on_block && !is_left_on_block) {
                _rotation = -70;
            }
        }
        return _rotation;
    };
    GameUtils.calcTimeWhenPlayerMovePoint = function (target_x, target_y) {
        var global_block_center = GameController.instance.getNextBlock().getCenterGlobalPoint();
        var global_player_point = GameUtils.getPlayerGlobalPoint();
        var temp_degree = Math.atan((global_block_center.y - global_player_point.y) / (global_block_center.x - global_player_point.x));
        if (global_block_center.x > global_player_point.x) {
            temp_degree = -1 * temp_degree;
        }
        else {
            temp_degree = Math.PI - temp_degree;
        }
        var rate_x = Math.cos(temp_degree);
        var rate_y = Math.sin(temp_degree);
        return (target_x - global_player_point.x) / (2 * rate_x * GameConfig.move_speed_distance) * GameConfig.gravity_acce / GameConfig.push_down_acce;
    };
    GameUtils.TestCalcDeltaXByPushTime = function (push_down_time) {
        var push_down_speed = GameConfig.push_down_acce * push_down_time; //松开后的速度
        var half_move_time = push_down_speed / GameConfig.gravity_acce; //计算向上运动的时间
        var total_move_time = half_move_time * 2;
        var speed_distance = GameConfig.move_speed_distance;
        var target_height = push_down_speed * half_move_time * 0.5; //计算向上运动的高度
        var global_block_center = GameController.instance.getNextBlock().getCenterGlobalPoint();
        var global_player_point = GameUtils.getPlayerGlobalPoint();
        var temp_degree = Math.atan((global_block_center.y - global_player_point.y) / (global_block_center.x - global_player_point.x));
        if (global_block_center.x > global_player_point.x) {
            temp_degree = -1 * temp_degree;
        }
        else {
            temp_degree = Math.PI - temp_degree;
        }
        var rate_x = Math.cos(temp_degree);
        var rate_y = Math.sin(temp_degree);
        return speed_distance * total_move_time * rate_x;
    };
    GameUtils.calcPlayerMovePoints = function (push_down_time, global_center_top_point, global_target_point) {
        var push_down_speed = GameConfig.push_down_acce * push_down_time; //松开后的速度
        var half_move_time = push_down_speed / GameConfig.gravity_acce; //计算向上运动的时间
        var total_move_time = half_move_time * 2;
        var speed_distance = GameConfig.move_speed_distance;
        var target_height = push_down_speed * half_move_time * 0.5; //计算向上运动的高度
        var global_block_center = GameController.instance.getNextBlock().getCenterGlobalPoint();
        var global_player_point = GameUtils.getPlayerGlobalPoint();
        var temp_degree = Math.atan((global_block_center.y - global_player_point.y) / (global_block_center.x - global_player_point.x));
        if (global_block_center.x > global_player_point.x) {
            temp_degree = -1 * temp_degree;
        }
        else {
            temp_degree = Math.PI - temp_degree;
        }
        var rate_x = Math.cos(temp_degree);
        var rate_y = Math.sin(temp_degree);
        var target_x = global_player_point.x + speed_distance * total_move_time * rate_x;
        var target_y = global_player_point.y - speed_distance * total_move_time * rate_y;
        var origin_center_x = (global_player_point.x + target_x) / 2;
        var oring_center_y = (global_player_point.y + target_y) / 2;
        var center_x = origin_center_x - target_height * Math.abs(rate_y);
        var center_y = oring_center_y - target_height * Math.abs(rate_x);
        global_center_top_point.x = center_x;
        global_center_top_point.y = center_y;
        global_target_point.x = target_x;
        global_target_point.y = target_y;
        return 1000 * 0.15;
    };
    GameUtils.addButtonClick = function (button, callback, callbackThis) {
        button.enabled = true;
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            GameUtils.tweenScaleTo(button, 0.9, 0.9, 0.1 * 1000, null);
        }, this);
        button.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            GameUtils.tweenScaleTo(button, 1, 1, 0.2 * 1000, null);
        }, this);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (callback) {
                callback.apply(callbackThis);
            }
        }, this);
    };
    GameUtils._instance = null;
    return GameUtils;
}());
__reflect(GameUtils.prototype, "GameUtils");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var ui;
(function (ui) {
    var MainGameScene = (function (_super) {
        __extends(MainGameScene, _super);
        function MainGameScene() {
            var _this = _super.call(this) || this;
            _this.curr_score = 0;
            _this.touchStartPlayerX = 0;
            _this.touchStartPlayerY = 0;
            GameUtils.mainGameScene = _this;
            _this.skinName = "GameMainView";
            GameController.instance.setMaxBlockInUse(5);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.RESIZE, _this.onResize, _this);
            _this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            GameController.instance.setMainGameScene(_this);
            GameController.instance.start_play_time = new Date().getSeconds();
            return _this;
        }
        MainGameScene.prototype.generateNextBlock = function () {
            var new_block = GameController.instance.generateNextBlock();
            this.next_block = new_block;
            GameController.instance.moveCarmera();
            return new_block;
        };
        MainGameScene.prototype.jumpPlayer = function (time) {
            if (this.is_in_jumping) {
                return;
            }
            this.is_in_jumping = true;
            var global_block_center = this.next_block.getCenterGlobalPoint();
            var global_player_point = GameUtils.getPlayerGlobalPoint();
            var is_verse = global_block_center.x < global_player_point.x; //方向向右.
            var global_center_top_point = new egret.Point();
            var global_target_point = new egret.Point();
            var seg_time = GameUtils.calcPlayerMovePoints(time, global_center_top_point, global_target_point);
            var local_center_point = GameUtils.convertGlobalPoint2PlayerLocalPoint(global_center_top_point.x, global_center_top_point.y);
            var local_target_point = GameUtils.convertGlobalPoint2PlayerLocalPoint(global_target_point.x, global_target_point.y);
            var center_jump_result = GameUtils.isPointOnBlock(global_target_point.x, global_target_point.y);
            var is_center_on_block = center_jump_result != JUMP_RESULT.FAIL;
            GameUtils.tweenMoveTo(this.player, local_center_point.x, local_center_point.y, seg_time, null, function () {
                GameUtils.tweenMoveTo(this.player, local_target_point.x, local_target_point.y, seg_time, null, function () {
                    if (!is_center_on_block) {
                        var _rotation = GameUtils.calcPlayerRotationIfJumpFail(global_target_point.x, global_target_point.y, !is_verse);
                        var _need_rotation = _rotation != 0;
                        if (_need_rotation) {
                            GameUtils.tweenRotate(this.player, _rotation, 0.4 * 1000, egret.Ease.sineIn, function () {
                                this.onJumpFail();
                            }, this);
                        }
                        else {
                            GameUtils.tweenMoveBy(this.player, 0, 80, 0.4 * 1000, null, function () {
                                this.onJumpFail();
                            }, this);
                        }
                    }
                    else {
                        GameUtils.tweenPushPlayerDownEffect(function () {
                            if (center_jump_result == JUMP_RESULT.NEXT_BLOCK) {
                                this.onJumpSuccess();
                            }
                            this.is_in_jumping = false;
                        }, this);
                    }
                }, this);
            }, this);
            var rotation_scale = is_verse ? -1 : 1;
            GameUtils.tweenRotate(this.player_img, 180 * rotation_scale, seg_time, null, function () {
                GameUtils.tweenRotate(this.player_img, 360 * rotation_scale, seg_time);
            }, this);
        };
        MainGameScene.prototype.onJumpFail = function () {
            this.is_in_jumping = false;
            ui.PanelManager.instance.showGameOverTips(this.curr_score);
        };
        MainGameScene.prototype.onJumpSuccess = function () {
            var add_score = this.next_block.getPlayerScore();
            this.current_block = this.next_block;
            this.generateNextBlock();
            this.curr_score += add_score;
            if (add_score == 10) {
                ui.PanelManager.instance.showMessage("太棒了！+" + add_score);
            }
            else {
                ui.PanelManager.instance.showMessage("+" + add_score);
            }
            this._updateScore();
        };
        MainGameScene.prototype.onAddToStage = function (evt) {
            this.restartGame();
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        MainGameScene.prototype.onResize = function (evt) {
        };
        MainGameScene.prototype.onTouchBegin = function (event) {
            if (this.is_in_jumping) {
                return;
            }
            if (!this.next_block) {
                return;
            }
            this.touchStartPlayerX = this.player.x;
            this.touchStartPlayerY = this.player.y;
            this.start_time = egret.getTimer();
            this.addEventListener(egret.Event.ENTER_FRAME, this.TouchEnterFrame, this);
            this.is_touching = true;
            GameController.instance.playPushSound();
        };
        MainGameScene.prototype.TouchEnterFrame = function (event) {
            if (!this.is_touching) {
                return;
            }
            var current_scale_x = this.player.scaleX;
            var current_scale_y = this.player.scaleY;
            current_scale_x += 0.1 * 1 / 30;
            current_scale_y -= 0.1 * 1 / 30;
            current_scale_x = Math.min(current_scale_x, 1.8);
            current_scale_y = Math.max(current_scale_y, 0.7);
            this.current_block.container.scaleY = current_scale_y;
            this.player.scaleX = current_scale_x;
            this.player.scaleY = current_scale_y;
            var delta_y = (1 - current_scale_y) * this.current_block.height;
            this.player.y = this.touchStartPlayerY + delta_y;
        };
        MainGameScene.prototype.onTouchEnd = function (event) {
            if (!this.is_touching) {
                return;
            }
            this.end_time = egret.getTimer();
            var delta_time = this.end_time - this.start_time;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.TouchEnterFrame, this);
            var scale_tween = egret.Tween.get(this.player);
            scale_tween.to({ scaleX: 1, scaleY: 1 }, 0.05 * 1000).call(function () {
                this.jumpPlayer(delta_time / 1000);
            }, this);
            GameUtils.tweenScaleTo(this.current_block.container, 1, 1, 0.1 * 1000, null);
            GameController.instance.playJumpSound();
            this.is_touching = false;
        };
        MainGameScene.prototype._updateScore = function () {
            this.label_score.text = "当前积分：" + this.curr_score;
        };
        /**
         * 重置所有的状态数据
         */
        MainGameScene.prototype.resetAllData = function () {
            this.is_first_start = true;
            this.is_in_jumping = false;
            GameController.instance.clear();
            this.block_container.removeChildren();
            this.current_block = null;
            this.next_block = null;
            this.player.rotation = 0;
            this.player_img.rotation = 0;
            this.player.scaleX = 1;
            this.player.scaleY = 1;
            this.move_container.x = 0;
            this.move_container.y = 0;
            this.curr_score = 0;
            this._updateScore();
        };
        MainGameScene.prototype.restartGame = function () {
            this.resetAllData();
            var _current_block = GameController.instance.createBlock();
            _current_block.x = GameConfig.default_init_player_x;
            _current_block.y = GameConfig.default_init_player_y;
            this.current_block = _current_block;
            this.generateNextBlock();
            var global_block_center = _current_block.getCenterGlobalPoint();
            var local_in_player_container = new egret.Point();
            this.player_container.globalToLocal(global_block_center.x, global_block_center.y, local_in_player_container);
            this.player.x = local_in_player_container.x;
            this.player.y = local_in_player_container.y - 200;
            this.is_in_jumping = true;
            GameUtils.tweenBounceUp(this.player, local_in_player_container.y, 50, 0.2 * 1000, 0.1 * 1000, function () {
                this.is_in_jumping = false;
            }, this);
        };
        MainGameScene.prototype.close = function () {
            this.parent.removeChild(this);
        };
        return MainGameScene;
    }(ui.BaseGameScene));
    ui.MainGameScene = MainGameScene;
    __reflect(MainGameScene.prototype, "ui.MainGameScene");
})(ui || (ui = {}));
var ui;
(function (ui) {
    var MessageTips = (function (_super) {
        __extends(MessageTips, _super);
        function MessageTips(message) {
            var _this = _super.call(this) || this;
            _this.skinName = "MessageTipsSkin";
            _this.label_tips.text = message;
            _this.label_tips.x = _this.width / 2 - _this.label_tips.width / 2;
            var __this = _this;
            GameUtils.tweenMoveBy(_this.label_tips, 0, -100, 0.5 * 1000, egret.Ease.sineIn, function () {
                setTimeout(function () {
                    __this.parent.removeChild(__this);
                }, 0.5 * 1000);
            }, _this);
            return _this;
        }
        return MessageTips;
    }(eui.Component));
    ui.MessageTips = MessageTips;
    __reflect(MessageTips.prototype, "ui.MessageTips");
})(ui || (ui = {}));
var ui;
(function (ui) {
    var PanelManager = (function () {
        function PanelManager() {
        }
        Object.defineProperty(PanelManager, "instance", {
            get: function () {
                if (!PanelManager._instace) {
                    PanelManager._instace = new ui.PanelManager();
                }
                return PanelManager._instace;
            },
            enumerable: true,
            configurable: true
        });
        PanelManager.prototype.setContainer = function (container) {
            this._container = container;
        };
        PanelManager.prototype.setMessageContainer = function (messageContainer) {
            this._message_container = messageContainer;
        };
        PanelManager.prototype.showGameOverTips = function (score) {
            var overTips = new ui.GameOverTips(score);
            this._container.addChild(overTips);
            overTips.x = GameUtils.stage.stageWidth / 2 - overTips.width / 2;
            overTips.y = GameUtils.stage.stageHeight / 2 - overTips.height / 2;
        };
        PanelManager.prototype.showStartPanel = function () {
            var panel = new ui.StartGameScene();
            this._container.addChild(panel);
            panel.x = GameUtils.stage.stageWidth / 2 - panel.width / 2;
            panel.y = GameUtils.stage.stageHeight / 2 - panel.height / 2;
        };
        PanelManager.prototype.showGamePanel = function () {
            var panel = new ui.MainGameScene();
            this._container.addChild(panel);
            panel.x = GameUtils.stage.stageWidth / 2 - panel.width / 2;
            panel.y = GameUtils.stage.stageHeight / 2 - panel.height / 2;
        };
        PanelManager.prototype.showPanel = function (panel_name) {
            var panel_clz = egret.getDefinitionByName(panel_name);
            var panel = new panel_clz();
            this._container.addChild(panel);
            panel.x = GameUtils.stage.stageWidth / 2 - panel.width / 2;
            panel.y = GameUtils.stage.stageHeight / 2 - panel.height / 2;
        };
        PanelManager.prototype.showMessage = function (message) {
            var messageTips = new ui.MessageTips(message);
            this._message_container.addChildAt(messageTips, 1);
            messageTips.x = GameUtils.stage.stageWidth / 2 - messageTips.width / 2;
            messageTips.y = GameUtils.stage.stageHeight / 2 - messageTips.height;
        };
        PanelManager._instace = null;
        return PanelManager;
    }());
    ui.PanelManager = PanelManager;
    __reflect(PanelManager.prototype, "ui.PanelManager");
})(ui || (ui = {}));
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.setUserCloudStorage = function (KVDataList) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.getSetting = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.getUserCloudStorage = function (key_list) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var ui;
(function (ui) {
    var StartGameScene = (function (_super) {
        __extends(StartGameScene, _super);
        function StartGameScene() {
            var _this = _super.call(this) || this;
            _this.is_destory = false;
            _this.hasLogin = false;
            _this.skinName = "StartGameSkin";
            GameUtils.addButtonClick(_this.btn_start, _this.onClick, _this);
            GameUtils.addButtonClick(_this.btn_rank, _this.onClickRank, _this);
            GameController.instance.setMaxBlockInUse(10);
            _this.player.x = GameConfig.default_simulate_init_player_x;
            _this.player.y = GameConfig.default_simulate_init_player_y;
            GameController.instance.setMainGameScene(_this);
            var __this = _this;
            setTimeout(function () {
                __this.start_generate_simulate_animation();
            }, 0.5 * 1000);
            _this.startLogin();
            platform.openDataContext.postMessage({
                command: "loadRes"
            });
            GameUtils.addButtonClick(_this.btn_close, function () {
                platform.openDataContext.postMessage({
                    command: "close"
                });
                __this.rank_group.visible = false;
            }, _this);
            platform.openDataContext.postMessage({
                command: "showRank",
                rank_key: "tiaoyitiao_score"
            });
            return _this;
        }
        StartGameScene.prototype.onClickRank = function () {
            var bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            platform.openDataContext.postMessage({
                isDisplay: true,
                text: 'hello',
                year: (new Date()).getFullYear(),
                command: "open"
            });
            this.rank_group.visible = true;
            this.rank_group.addChild(bitmap);
        };
        StartGameScene.prototype.startLogin = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        StartGameScene.prototype.start_generate_simulate_animation = function () {
            var last_block = null;
            var max_index = 6;
            var blocks = GameController.instance.getAllBlocks();
            var averge_x = 0;
            var averge_y = 0;
            var curr_index = 0;
            for (var index = 0; index < max_index; index++) {
                var next_blocks = GameController.instance.generateSimulateBlock(averge_x, averge_y, index == 2 || index == 4);
                averge_x = averge_y = 0;
                for (var next_index = 0; next_index < next_blocks.length; next_index++) {
                    curr_index += 1;
                    var next_block = next_blocks[next_index];
                    // blocks.push(next_block)
                    next_block.visible = false;
                    averge_x += next_block.x;
                    averge_y += next_block.y;
                    next_block.setIndex(curr_index);
                }
                averge_x /= next_blocks.length;
                averge_y /= next_blocks.length;
            }
            var delta_y = 150;
            var __this = this;
            var _loop_1 = function (block_index) {
                var block_1 = blocks[block_index];
                var target_y = block_1.y;
                block_1.y -= delta_y;
                setTimeout(function () {
                    block_1.visible = true;
                    GameUtils.tweenBounceUp(block_1, target_y, 50, 0.3 * 1000, 0.1 * 1000, function () {
                        if (block_index == blocks.length - 1) {
                            __this.on_generate_simulate_animation_compelete();
                        }
                    });
                }, block_index * 0.2 * 1000);
            };
            for (var block_index = 0; block_index < blocks.length; block_index++) {
                _loop_1(block_index);
            }
            this.next_block = blocks[0];
        };
        StartGameScene.prototype.on_generate_simulate_animation_compelete = function () {
            if (this.is_destory) {
                return;
            }
            var __this = this;
            setTimeout(function () {
                __this.jump_to_next_block(null, function () {
                    __this.start_change_color();
                });
            }, 0.5 * 1000);
        };
        StartGameScene.prototype.start_change_color = function () {
            if (this.is_destory) {
                return;
            }
            var __this = this;
            var blocks = GameController.instance.getAllBlocks();
            var _loop_2 = function (index) {
                var block_2 = blocks[index];
                setTimeout(function () {
                    block_2.changeGrayColor();
                    if (index == blocks.length - 1) {
                        __this.start_simulate_hide_block_animation();
                    }
                }, 0.05 * (index - 1) * 1000);
            };
            for (var index = 1; index < blocks.length; index++) {
                _loop_2(index);
            }
        };
        StartGameScene.prototype.start_simulate_hide_block_animation = function () {
            if (this.is_destory) {
                return;
            }
            var __this = this;
            var is_to_left = true;
            var blocks = GameController.instance.getAllBlocks();
            var delay_index = 0;
            var _loop_3 = function (index) {
                var block_3 = blocks[index];
                var move_by_x_scope = 700;
                var move_by_y_scope = 0;
                if (is_to_left) {
                    move_by_x_scope *= -1;
                    move_by_y_scope = move_by_x_scope * GameConfig.slope_rate_left;
                }
                else {
                    move_by_y_scope = move_by_x_scope * GameConfig.slope_rate_right * -1;
                }
                setTimeout(function () {
                    GameUtils.tweenMoveBy(block_3, move_by_x_scope, move_by_y_scope, 0.4 * 1000, null, function () {
                        if (index == blocks.length - 1) {
                            __this.simulate_hide_block_animation_compelete();
                        }
                    }, this);
                }, 0.2 * delay_index * 1000);
                if (!(index == 2 || index == 4)) {
                    delay_index += 1;
                }
                is_to_left = !is_to_left;
            };
            for (var index = 1; index < blocks.length; index++) {
                _loop_3(index);
            }
        };
        StartGameScene.prototype.simulate_hide_block_animation_compelete = function () {
            if (this.is_destory) {
                return;
            }
            var blocks = GameController.instance.getAllBlocks();
            while (blocks.length > 1) {
                var block_4 = blocks.pop();
                block_4.remove();
            }
            GameController.instance.setMaxBlockInUse(5);
            this.next_block = null;
            this.auto_generate_block_and_jump();
        };
        StartGameScene.prototype.auto_generate_block_and_jump = function () {
            if (this.is_destory) {
                return;
            }
            var __this = this;
            var blocks = GameController.instance.getAllBlocks();
            this.current_block = this.next_block || blocks[0];
            this.next_block = GameController.instance.generateNextBlock(0.6);
            GameController.instance.moveCarmera();
            // let total_scale_y = 0
            // let frame_index = 0
            // let init_y = this.player.y
            // let total_time = 0
            // while(total_scale_y <= 0.3){
            // 	frame_index += 1
            // 	total_scale_y += 0.1 * 1 / 30;
            // 	this.player.y = init_y -  total_scale_y * this.current_block.height * 0.6
            // 	total_time += 1 / 30
            // 	let ret = GameUtils.TestCalcDeltaXByPushTime(total_time)
            // 	console.log(frame_index,ret)
            // }
            setTimeout(function () {
                __this.play_block_push_effect(function () {
                    __this.jump_to_next_block();
                    setTimeout(function () {
                        __this.auto_generate_block_and_jump();
                    }, 0.5 * 1000);
                });
            }, 1.0 * 1000);
        };
        StartGameScene.prototype.play_block_push_effect = function (callback) {
            if (callback === void 0) { callback = null; }
            if (callback) {
                callback();
            }
            // let global_block_center = GameController.instance.getNextBlock().getCenterGlobalPoint();
            // let global_player_point = GameUtils.getPlayerGlobalPoint();
            // let push_time = GameUtils.calcTimeWhenPlayerMovePoint(global_block_center.x, global_block_center.y)
            // let push_down_speed = GameConfig.push_down_acce * push_time  //松开后的速度
            // let half_move_time = push_down_speed / GameConfig.gravity_acce  //计算向上运动的时间
            // let total_move_time = half_move_time * 2
            // let speed_distance = GameConfig.move_speed_distance
            // let target_height = push_down_speed * half_move_time * 0.5  //计算向上运动的高度
            // let __this = this
            // let delta_scale_y = 0.1 * push_time
            // let delta_y = delta_scale_y * this.current_block.height * 0.6
            // push_time *= (1 + delta_y / target_height)
            // GameUtils.tweenScaleTo(this.current_block.container, 1, 1 - delta_scale_y, 0.2 * 1000, null, function(){
            // 	GameUtils.tweenScaleTo(__this.current_block.container, 1, 1, 0.2 * 1000, null)
            // }, this)
            // GameUtils.tweenMoveBy(this.push_scale_player, 0, delta_y, 0.2 * 1000, null, function(){
            // 	if(callback)
            // 	{
            // 		callback(push_time)
            // 	}
            // }, this)
        };
        StartGameScene.prototype.jump_to_next_block = function (push_time, callback) {
            if (push_time === void 0) { push_time = null; }
            if (callback === void 0) { callback = null; }
            var global_block_center = this.next_block.getCenterGlobalPoint();
            var global_player_point = GameUtils.getPlayerGlobalPoint();
            var is_verse = global_block_center.x < global_player_point.x; //方向向右.
            var global_center_top_point = new egret.Point();
            var global_target_point = new egret.Point();
            if (!push_time) {
                push_time = GameUtils.calcTimeWhenPlayerMovePoint(global_block_center.x, global_block_center.y);
            }
            // let time = GameUtils.calcTimeWhenPlayerMovePoint(global_block_center.x, global_block_center.y)
            var seg_time = GameUtils.calcPlayerMovePoints(push_time, global_center_top_point, global_target_point);
            var local_center_point = GameUtils.convertGlobalPoint2PlayerLocalPoint(global_center_top_point.x, global_center_top_point.y);
            var local_target_point = GameUtils.convertGlobalPoint2PlayerLocalPoint(global_target_point.x, global_target_point.y);
            var is_center_on_block = true;
            GameUtils.tweenMoveTo(this.player, local_center_point.x, local_center_point.y, seg_time, null, function () {
                GameUtils.tweenMoveTo(this.player, local_target_point.x, local_target_point.y, seg_time, null, function () {
                    GameUtils.tweenPushPlayerDownEffect(function () {
                        if (callback) {
                            callback();
                        }
                    }, this);
                }, this);
            }, this);
            var rotation_scale = is_verse ? -1 : 1;
            GameUtils.tweenRotate(this.player_img, 180 * rotation_scale, seg_time, null, function () {
                GameUtils.tweenRotate(this.player_img, 360 * rotation_scale, seg_time);
            }, this);
        };
        StartGameScene.prototype.onClick = function (event) {
            // console.log("###########", this.user_info, this.hasLogin)
            // if(!this.hasLogin || !this.user_info){
            // 	ui.PanelManager.instance.showMessage("您还未授权登录")
            // 	return
            // }
            this.parent.removeChild(this);
            this.is_destory = true;
            ui.PanelManager.instance.showGamePanel();
        };
        return StartGameScene;
    }(ui.BaseGameScene));
    ui.StartGameScene = StartGameScene;
    __reflect(StartGameScene.prototype, "ui.StartGameScene");
})(ui || (ui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);

;window.Main = Main;