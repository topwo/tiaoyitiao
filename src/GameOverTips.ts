module ui {
	export class GameOverTips extends eui.Component{

		public btnRestart:eui.Button;

		public constructor() {
			super();
			this.skinName = "GameOver_Tips";
			this.btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		}

		private onTouchTap(event:egret.TouchEvent):void{
			this.parent.removeChild(this);
			GameUtils.mainGameScene.restartGame();
		}
	}
}