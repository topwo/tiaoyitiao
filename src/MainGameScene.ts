module ui {

	

	export class MainGameScene extends eui.Component {

		public move_container : egret.DisplayObjectContainer;
		private touchLayer : egret.DisplayObjectContainer;
		public player : egret.DisplayObject;
		public player_img : egret.DisplayObject;
		public player_container : egret.DisplayObjectContainer;
		public block_container : egret.DisplayObjectContainer;

		public current_block : ui.BlockObject;
		public next_block : ui.BlockObject;

		private start_time : number;
		private end_time : number;
		private is_touching : boolean;

		public is_first_start : boolean;
		public is_in_jumping : boolean;

		public label_score : eui.Label;
		private curr_score : number = 0;
		
		public constructor() {
			super();
			GameUtils.mainGameScene = this;
			this.skinName = "GameMainView";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.Event.RESIZE, this.onResize, this);
			
			this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

			ui.PanelManager.instance.setContainer(this);
			GameController.instance.setMainGameScene(this);
		}

		private generateNextBlock():ui.BlockObject{
			let new_block = GameController.instance.generateNextBlock()
			this.next_block = new_block
			GameController.instance.moveCarmera();
			return new_block;
		}

		private jumpPlayer(time:number):void{

			if(this.is_in_jumping){
				return;
			}
			this.is_in_jumping = true;
			
			let global_block_center = this.next_block.getCenterGlobalPoint();
			let global_player_point = GameUtils.getPlayerGlobalPoint();
			let is_verse = global_block_center.x < global_player_point.x  //方向向右.

			let global_center_top_point = new egret.Point()
			let global_target_point = new egret.Point()
			let seg_time = GameUtils.calcPlayerMovePoints(time, global_center_top_point, global_target_point)

			let local_center_point = GameUtils.convertGlobalPoint2PlayerLocalPoint(global_center_top_point.x, global_center_top_point.y);
			let local_target_point = GameUtils.convertGlobalPoint2PlayerLocalPoint(global_target_point.x, global_target_point.y);

			let center_jump_result = GameUtils.isPointOnBlock(global_target_point.x, global_target_point.y)
			let is_center_on_block = center_jump_result != JUMP_RESULT.FAIL

			GameUtils.tweenMoveTo(this.player, local_center_point.x, local_center_point.y, seg_time, null, function(){
				GameUtils.tweenMoveTo(this.player, local_target_point.x, local_target_point.y, seg_time, null, function(){
					if(!is_center_on_block){  //没有停在block上面
						let _rotation = GameUtils.calcPlayerRotationIfJumpFail(global_target_point.x, global_target_point.y, !is_verse)
						let _need_rotation = _rotation != 0
						if(_need_rotation){  //停在了边缘上，需要忘后倒或前倒
							GameUtils.tweenRotate(this.player, _rotation, 0.4 * 1000, egret.Ease.sineIn, function(){
								this.onJumpFail()
							}, this)
						}else{	//掉到了空的地方，继续下移一段距离
							GameUtils.tweenMoveBy(this.player, 0, 80, 0.4 * 1000, null, function(){
								this.onJumpFail()
							}, this)
						}
					}else{
						GameUtils.tweenPushPlayerDownEffect(function(){
							if(center_jump_result == JUMP_RESULT.NEXT_BLOCK){
								this.onJumpSuccess()
							}
							this.is_in_jumping = false;
						}, this)
					}
				}, this)
			}, this)

			let rotation_scale = is_verse ? -1 : 1;
			GameUtils.tweenRotate(this.player_img, 180 * rotation_scale, seg_time, null, function(){
				GameUtils.tweenRotate(this.player_img, 360 * rotation_scale, seg_time)
			}, this)

		}

		private onJumpFail(){
			this.is_in_jumping = false;
			ui.PanelManager.instance.showGameOverTips();
		}

		private onJumpSuccess(){
			this.current_block = this.next_block;
			this.generateNextBlock();
			this.curr_score += 5;
			this._updateScore();
		}

		private onAddToStage(evt:egret.Event):void
		{
			GameUtils.stage = this.stage;
			this.restartGame();
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onResize(evt:egret.Event):void
		{
		}


		private onTouchBegin(event:egret.TouchEvent):void
		{
			if(this.is_in_jumping){
				return;
			}
			if(!this.next_block){
				return;
			}
			this.start_time = egret.getTimer();
			this.addEventListener(egret.Event.ENTER_FRAME, this.TouchEnterFrame, this);
			this.is_touching = true;
		}

		private TouchEnterFrame(event:egret.Event):void
		{
			if(!this.is_touching){
				return;
			}
			let current_scale_x = this.player.scaleX;
			let current_scale_y = this.player.scaleY;

			current_scale_x += 0.1 * 1 / 30;
			current_scale_y -= 0.1 * 1 / 30;
			current_scale_x = Math.min(current_scale_x, 1.8)
			current_scale_y = Math.max(current_scale_y, 0.7)
			this.player.scaleX = current_scale_x
			this.player.scaleY = current_scale_y
		}

		private onTouchEnd(event:egret.TouchEvent):void
		{
			if(!this.is_touching){
				return;
			}
			this.end_time = egret.getTimer();
			let delta_time = this.end_time - this.start_time;
			delta_time = Math.min(delta_time, 10 * 1000);
			console.log(delta_time);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.TouchEnterFrame, this);
			
			let scale_tween = egret.Tween.get(this.player)
			scale_tween.to({scaleX:1, scaleY:1}, 0.05 * 1000).call(function(){
				this.jumpPlayer(delta_time / 1000)
			}, this)

			this.is_touching = false;
		}	

		private _updateScore():void
		{
			this.label_score.text = "当前积分：" + this.curr_score;
		}

		/**
		 * 重置所有的状态数据
		 */
		private resetAllData():void
		{
			this.is_first_start = true;
			this.is_in_jumping = false;
			GameController.instance.clear()
			this.block_container.removeChildren();
			this.current_block = null;
			this.next_block = null;
			this.player.rotation = 0;
			this.player_img.rotation = 0;
			this.player.scaleX = 1;
			this.player.scaleY = 1;
			this.move_container.x = 0
			this.move_container.y = 0
			this.curr_score = 0;
			this._updateScore();
		}

		public restartGame():void{
			
			this.resetAllData()
			let _current_block = GameController.instance.createBlock();
			_current_block.x = GameConfig.default_init_player_x;
			_current_block.y = GameConfig.default_init_player_y;
			this.current_block = _current_block;

			this.generateNextBlock();

			let global_block_center = _current_block.getCenterGlobalPoint();
			let local_in_player_container = new egret.Point();
			this.player_container.globalToLocal(global_block_center.x, global_block_center.y, local_in_player_container);
			this.player.x = local_in_player_container.x;
			this.player.y = local_in_player_container.y - 200;

			this.is_in_jumping = true;

			GameUtils.tweenBounceUp(this.player, local_in_player_container.y, 50, 0.2 * 1000, 0.1 * 1000, function(){
				this.is_in_jumping = false
			}, this)
		}
	}
}