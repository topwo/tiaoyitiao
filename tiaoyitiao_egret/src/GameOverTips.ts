module ui {
	export class GameOverTips extends eui.Component{

		private btnRestart:eui.Button;
		private label_score:eui.Label

		public constructor(score) {
			super();
			this.skinName = "GameOver_Tips";
			this.btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			this.label_score.text = "积分：" + score

			let save_func = function()
			{
				wx.setStorage({key:"my_score", data:score})

				let end_time = new Date().getSeconds();

				let KVDataList = [{
					key:"",
					value:""
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
			}
			if(typeof wx == "object")
			{
				wx.getStorage({
					key: 'my_score',
					fail: function(res){
						save_func()
					},
					success: function(res) {
						// console.log(res.data)
						if(!res.data || score > res.data)
						{
							save_func()
						}
					} 
				})
			}
			

		}

		private onTouchTap(event:egret.TouchEvent):void{
			this.parent.removeChild(this);
			GameUtils.mainGameScene.close()
			ui.PanelManager.instance.showStartPanel()
			// GameUtils.mainGameScene.restartGame();
		}
	}
}