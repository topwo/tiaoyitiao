module ui {
	export class GameOverTips extends eui.Component{

		private btnRestart:eui.Button;
		private label_score:eui.Label

		public constructor(score) {
			super();
			this.skinName = "GameOver_Tips";
			this.btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			this.label_score.text = "积分：" + score
		}

		private onTouchTap(event:egret.TouchEvent):void{
			this.parent.removeChild(this);
			GameUtils.mainGameScene.restartGame();
		}
	}
}