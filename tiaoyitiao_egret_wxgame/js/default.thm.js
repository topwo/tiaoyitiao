var egret = window.egret;window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/block.exml'] = window.block = (function (_super) {
	__extends(block, _super);
	function block() {
		_super.call(this);
		this.skinParts = ["img","node1","node2","node3","node4","label_index","container"];
		
		this.height = 240;
		this.width = 358;
		this.elementsContent = [this.container_i()];
	}
	var _proto = block.prototype;

	_proto.container_i = function () {
		var t = new eui.Group();
		this.container = t;
		t.anchorOffsetX = 179;
		t.anchorOffsetY = 240;
		t.height = 240;
		t.rotation = 0;
		t.scaleY = 1;
		t.width = 358;
		t.x = 179;
		t.y = 240;
		t.elementsContent = [this.img_i(),this.node1_i(),this.node2_i(),this.node3_i(),this.node4_i(),this.label_index_i()];
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.anchorOffsetX = 179;
		t.anchorOffsetY = 240;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "block1_png";
		t.x = 179;
		t.y = 240;
		return t;
	};
	_proto.node1_i = function () {
		var t = new eui.Group();
		this.node1 = t;
		t.anchorOffsetX = 26;
		t.anchorOffsetY = 52;
		t.height = 52;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 52;
		t.x = 92.01;
		t.y = 78.37;
		return t;
	};
	_proto.node2_i = function () {
		var t = new eui.Group();
		this.node2 = t;
		t.anchorOffsetX = 26;
		t.anchorOffsetY = 52;
		t.height = 52;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 52;
		t.x = 224.01;
		t.y = 0;
		return t;
	};
	_proto.node3_i = function () {
		var t = new eui.Group();
		this.node3 = t;
		t.anchorOffsetX = 26;
		t.anchorOffsetY = 52;
		t.height = 52;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 52;
		t.x = 354.78;
		t.y = 78.37;
		return t;
	};
	_proto.node4_i = function () {
		var t = new eui.Group();
		this.node4 = t;
		t.anchorOffsetX = 26;
		t.anchorOffsetY = 52;
		t.height = 52;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 52;
		t.x = 224.01;
		t.y = 154;
		return t;
	};
	_proto.label_index_i = function () {
		var t = new eui.Label();
		this.label_index = t;
		t.anchorOffsetX = 28;
		t.anchorOffsetY = 50;
		t.rotation = 0;
		t.size = 100;
		t.text = "5";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.x = 224.01;
		t.y = 75.55;
		return t;
	};
	return block;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameMainView.exml'] = window.GameMainView = (function (_super) {
	__extends(GameMainView, _super);
	function GameMainView() {
		_super.call(this);
		this.skinParts = ["block_container","player_img","player","player_container","move_container","touchLayer","label_score"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.move_container_i(),this.touchLayer_i(),this.label_score_i()];
	}
	var _proto = GameMainView.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1136;
		t.source = "bg_jpg";
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.move_container_i = function () {
		var t = new eui.Group();
		this.move_container = t;
		t.height = 1136;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.block_container_i(),this.player_container_i()];
		return t;
	};
	_proto.block_container_i = function () {
		var t = new eui.Group();
		this.block_container = t;
		t.height = 1136;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.player_container_i = function () {
		var t = new eui.Group();
		this.player_container = t;
		t.height = 1136;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.player_i()];
		return t;
	};
	_proto.player_i = function () {
		var t = new eui.Group();
		this.player = t;
		t.anchorOffsetX = 24;
		t.anchorOffsetY = 130;
		t.height = 130;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 48;
		t.x = 447;
		t.y = 506;
		t.elementsContent = [this.player_img_i()];
		return t;
	};
	_proto.player_img_i = function () {
		var t = new eui.Image();
		this.player_img = t;
		t.anchorOffsetX = 24;
		t.anchorOffsetY = 65;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "piece_png";
		t.x = 24;
		t.y = 65;
		return t;
	};
	_proto.touchLayer_i = function () {
		var t = new eui.Group();
		this.touchLayer = t;
		t.height = 1138;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.label_score_i = function () {
		var t = new eui.Label();
		this.label_score = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "KaiTi";
		t.height = 87.58;
		t.text = "当前积分：0";
		t.textAlign = "left";
		t.textColor = 0x050404;
		t.verticalAlign = "middle";
		t.width = 264.91;
		t.x = 55.09;
		t.y = 45.06;
		return t;
	};
	return GameMainView;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameOver_Tips.exml'] = window.GameOver_Tips = (function (_super) {
	__extends(GameOver_Tips, _super);
	var GameOver_Tips$Skin1 = 	(function (_super) {
		__extends(GameOver_Tips$Skin1, _super);
		function GameOver_Tips$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameOver_Tips$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "restart_btn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameOver_Tips$Skin1;
	})(eui.Skin);

	function GameOver_Tips() {
		_super.call(this);
		this.skinParts = ["btnRestart","label_score"];
		
		this.height = 1138;
		this.width = 640;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = GameOver_Tips.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1138;
		t.horizontalCenter = 0;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.verticalCenter = 0;
		t.width = 640;
		t.elementsContent = [this._Image1_i(),this.btnRestart_i(),this.label_score_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.fillMode = "scale";
		t.height = 1138;
		t.source = "bg_jpg";
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btnRestart_i = function () {
		var t = new eui.Button();
		this.btnRestart = t;
		t.horizontalCenter = 0.5;
		t.label = "";
		t.y = 806.36;
		t.skinName = GameOver_Tips$Skin1;
		return t;
	};
	_proto.label_score_i = function () {
		var t = new eui.Label();
		this.label_score = t;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "得分：0";
		t.textAlign = "center";
		t.textColor = 0x5b5959;
		t.verticalAlign = "middle";
		t.verticalCenter = -145;
		return t;
	};
	return GameOver_Tips;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/MessageTipsSkin.exml'] = window.MessageTipsSkin = (function (_super) {
	__extends(MessageTipsSkin, _super);
	function MessageTipsSkin() {
		_super.call(this);
		this.skinParts = ["label_tips"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this.label_tips_i()];
	}
	var _proto = MessageTipsSkin.prototype;

	_proto.label_tips_i = function () {
		var t = new eui.Label();
		this.label_tips = t;
		t.maxWidth = 300;
		t.multiline = true;
		t.size = 40;
		t.stroke = 1;
		t.text = "+2";
		t.textAlign = "center";
		t.textColor = 0x00ff00;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.x = 183;
		t.y = 135;
		return t;
	};
	return MessageTipsSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/StartGameSkin.exml'] = window.StartGameSkin = (function (_super) {
	__extends(StartGameSkin, _super);
	var StartGameSkin$Skin2 = 	(function (_super) {
		__extends(StartGameSkin$Skin2, _super);
		function StartGameSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StartGameSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "rankingtitle_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return StartGameSkin$Skin2;
	})(eui.Skin);

	var StartGameSkin$Skin3 = 	(function (_super) {
		__extends(StartGameSkin$Skin3, _super);
		function StartGameSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StartGameSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "start_btn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return StartGameSkin$Skin3;
	})(eui.Skin);

	var StartGameSkin$Skin4 = 	(function (_super) {
		__extends(StartGameSkin$Skin4, _super);
		function StartGameSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StartGameSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "button_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return StartGameSkin$Skin4;
	})(eui.Skin);

	function StartGameSkin() {
		_super.call(this);
		this.skinParts = ["btn_rank","block_container","player_img","push_scale_player","player","player_container","move_container","btn_start","btn_close","rank_group"];
		
		this.height = 1138;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.btn_rank_i(),this.move_container_i(),this._Label1_i(),this.btn_start_i(),this.rank_group_i()];
	}
	var _proto = StartGameSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "bg_jpg";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn_rank_i = function () {
		var t = new eui.Button();
		this.btn_rank = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 85.27;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 496;
		t.width = 258;
		t.skinName = StartGameSkin$Skin2;
		return t;
	};
	_proto.move_container_i = function () {
		var t = new eui.Group();
		this.move_container = t;
		t.height = 1136;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.block_container_i(),this.player_container_i()];
		return t;
	};
	_proto.block_container_i = function () {
		var t = new eui.Group();
		this.block_container = t;
		t.height = 1136;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "block1_png";
		t.visible = false;
		t.x = 32;
		t.y = 702;
		return t;
	};
	_proto.player_container_i = function () {
		var t = new eui.Group();
		this.player_container = t;
		t.height = 1136;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.player_i()];
		return t;
	};
	_proto.player_i = function () {
		var t = new eui.Group();
		this.player = t;
		t.anchorOffsetX = 24;
		t.anchorOffsetY = 130;
		t.height = 130;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 48;
		t.x = 56;
		t.y = 928;
		t.elementsContent = [this.push_scale_player_i()];
		return t;
	};
	_proto.push_scale_player_i = function () {
		var t = new eui.Group();
		this.push_scale_player = t;
		t.anchorOffsetX = 24;
		t.anchorOffsetY = 130;
		t.height = 130;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.width = 48;
		t.x = 24;
		t.y = 130;
		t.elementsContent = [this.player_img_i()];
		return t;
	};
	_proto.player_img_i = function () {
		var t = new eui.Image();
		this.player_img = t;
		t.anchorOffsetX = 24;
		t.anchorOffsetY = 65;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "piece_png";
		t.x = 24;
		t.y = 65;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.size = 100;
		t.text = "跳一跳";
		t.textColor = 0x666262;
		t.verticalCenter = -308;
		return t;
	};
	_proto.btn_start_i = function () {
		var t = new eui.Button();
		this.btn_start = t;
		t.enabled = true;
		t.horizontalCenter = 3.5;
		t.label = "";
		t.touchChildren = true;
		t.touchEnabled = true;
		t.verticalCenter = 379.5;
		t.skinName = StartGameSkin$Skin3;
		return t;
	};
	_proto.rank_group_i = function () {
		var t = new eui.Group();
		this.rank_group = t;
		t.height = 1138;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.visible = false;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this.btn_close_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0x9b9696;
		t.height = 1138;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new eui.Button();
		this.btn_close = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.enabled = true;
		t.height = 57;
		t.horizontalCenter = -20.5;
		t.label = "关闭";
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = true;
		t.touchEnabled = true;
		t.verticalCenter = -514.5;
		t.width = 159;
		t.x = 170;
		t.y = 896;
		t.skinName = StartGameSkin$Skin4;
		return t;
	};
	return StartGameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);