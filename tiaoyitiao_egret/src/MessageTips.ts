module ui {
	export class MessageTips extends eui.Component{

		private label_tips:eui.Label

		public constructor(message:string) {
			super()
			this.skinName = "MessageTipsSkin"
			this.label_tips.text = message
			this.label_tips.x = this.width / 2 - this.label_tips.width / 2

			let __this = this
			GameUtils.tweenMoveBy(this.label_tips, 0, -100, 0.5 * 1000, egret.Ease.sineIn, function(){
				setTimeout(function() {
					__this.parent.removeChild(__this)
				}, 0.5 * 1000);
			}, this)
		}
	}
}