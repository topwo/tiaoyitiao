module ui {
	export class PanelManager {

		private static _instace:PanelManager = null;

		private _container:egret.DisplayObjectContainer;
		private _message_container:egret.DisplayObjectContainer

		public constructor() {
		}

		public static get instance():PanelManager{
			if(!PanelManager._instace){
				PanelManager._instace = new ui.PanelManager();
			}
			return PanelManager._instace;
		}

		public setContainer(container:egret.DisplayObjectContainer):void
		{
			this._container = container;
		}

		public setMessageContainer(messageContainer:egret.DisplayObjectContainer):void
		{
			this._message_container = messageContainer
		}

		public showGameOverTips(score):void{
			let overTips = new ui.GameOverTips(score);
			this._container.addChild(overTips);
			overTips.x = GameUtils.stage.stageWidth / 2 - overTips.width / 2;
			overTips.y = GameUtils.stage.stageHeight / 2 - overTips.height / 2;
		}

		public showStartPanel()
		{
			let panel = new StartGameScene()
			this._container.addChild(panel)
			panel.x = GameUtils.stage.stageWidth / 2 - panel.width / 2;
			panel.y = GameUtils.stage.stageHeight / 2 - panel.height / 2;
		}

		public showGamePanel()
		{
			let panel = new MainGameScene()
			this._container.addChild(panel)
			panel.x = GameUtils.stage.stageWidth / 2 - panel.width / 2;
			panel.y = GameUtils.stage.stageHeight / 2 - panel.height / 2;
		}

		public showPanel(panel_name:string):void
		{
			let panel_clz = egret.getDefinitionByName(panel_name)
			let panel = new panel_clz()
			this._container.addChild(panel)
			panel.x = GameUtils.stage.stageWidth / 2 - panel.width / 2;
			panel.y = GameUtils.stage.stageHeight / 2 - panel.height / 2;
		}

		public showMessage(message:string)
		{
			let messageTips = new MessageTips(message)
			this._message_container.addChildAt(messageTips, 1)
			messageTips.x = GameUtils.stage.stageWidth / 2 - messageTips.width / 2;
			messageTips.y = GameUtils.stage.stageHeight / 2 - messageTips.height;
		}
	}
}