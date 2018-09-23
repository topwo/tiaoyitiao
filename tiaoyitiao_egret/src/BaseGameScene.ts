module ui {
	export class BaseGameScene extends eui.Component{

		public move_container : egret.DisplayObjectContainer;
		public player : egret.DisplayObject;
		public player_img : egret.DisplayObject;
		public player_container : egret.DisplayObjectContainer;
		public block_container : egret.DisplayObjectContainer;
		public current_block : ui.BlockObject;
		public next_block : ui.BlockObject;
		public is_first_start : boolean;
		
		public constructor() {
			super()
		}
	}
}