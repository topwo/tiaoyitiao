module ui {
	export class PanelManager {

		private static _instace:PanelManager = null;

		private _container:egret.DisplayObjectContainer;

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

		public showGameOverTips():void{
			let overTips = new ui.GameOverTips();
			this._container.addChild(overTips);
			overTips.x = GameUtils.stage.stageWidth / 2 - overTips.width / 2;
			overTips.y = GameUtils.stage.stageHeight / 2 - overTips.height / 2;
		}
	}
}