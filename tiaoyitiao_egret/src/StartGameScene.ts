module ui {
	export class StartGameScene extends ui.BaseGameScene{

		private btn_close:eui.Button
		private rank_group:egret.DisplayObjectContainer
		private btn_rank:eui.Button
		private btn_start:eui.Button
		private is_destory:boolean = false;
		private push_scale_player:egret.DisplayObject;
		private user_info:any;

		private hasLogin:boolean = false;
		public constructor() {
			super()
			this.skinName = "StartGameSkin"
			
			GameUtils.addButtonClick(this.btn_start, this.onClick, this)
			GameUtils.addButtonClick(this.btn_rank, this.onClickRank, this)
			
			GameController.instance.setMaxBlockInUse(10)
			this.player.x = GameConfig.default_simulate_init_player_x;
			this.player.y = GameConfig.default_simulate_init_player_y;

			GameController.instance.setMainGameScene(this);
			let __this = this;
			setTimeout(function() {
				__this.start_generate_simulate_animation()
			}, 0.5 * 1000);

			this.startLogin()

			if(typeof wx == "object"){
				platform.openDataContext.postMessage({
					command: "loadRes"
				});

				GameUtils.addButtonClick(this.btn_close, function(){
					platform.openDataContext.postMessage({
						command: "close"
					});
					__this.rank_group.visible = false;
				}, this)

				platform.openDataContext.postMessage({
					command: "showRank",
					rank_key: "tiaoyitiao_score"
				});
			}else{

			}
			
		}

		private onClickRank():void
		{
			
			let bitmap = platform.openDataContext.createDisplayObject(null,this.stage.stageWidth, this.stage.stageHeight);
			
			platform.openDataContext.postMessage({
				isDisplay: true,
				text: 'hello',
				year: (new Date()).getFullYear(),
				command: "open"
			});
			this.rank_group.visible = true
			this.rank_group.addChild(bitmap)
		}

		private async startLogin() {
			// let has_login = await platform.getSetting()
			// console.log("#####startLogin########", has_login)
			// if(!has_login){
			// 	await platform.login();
			// 	const userInfo = await platform.getUserInfo();
			// 	console.log(userInfo);
			// 	this.hasLogin = true
			// 	this.user_info = userInfo
			// }else{
			// 	this.hasLogin = true
			// 	this.user_info = true
			// }
		}

		private start_generate_simulate_animation():void
		{
			let last_block = null
			let max_index = 6
			let blocks:Array<ui.BlockObject> = GameController.instance.getAllBlocks()
			let averge_x = 0
			let averge_y = 0
			let curr_index = 0
			for(let index = 0; index < max_index; index++){
				let next_blocks = GameController.instance.generateSimulateBlock(averge_x, averge_y, index == 2 || index == 4);
				
				averge_x = averge_y = 0

				for(let next_index = 0; next_index < next_blocks.length; next_index ++)
				{
					curr_index += 1
					let next_block = next_blocks[next_index]
					// blocks.push(next_block)
					next_block.visible = false;
					averge_x += next_block.x
					averge_y += next_block.y
					next_block.setIndex(curr_index)
				}

				averge_x /= next_blocks.length
				averge_y /= next_blocks.length
			}

			let delta_y = 150
			
			let __this = this
			for(let block_index = 0; block_index < blocks.length; block_index++){
				let block = blocks[block_index]
				let target_y = block.y
				block.y -= delta_y
				setTimeout(function() {
					block.visible = true
					GameUtils.tweenBounceUp(block, target_y, 50, 0.3 * 1000, 0.1 * 1000, function(){
						if(block_index == blocks.length - 1){
							__this.on_generate_simulate_animation_compelete()
						} 
					})
				}, block_index * 0.2 * 1000);
			}
			this.next_block = blocks[0]
		}

		

		private on_generate_simulate_animation_compelete()
		{
			if(this.is_destory)
			{
				return
			}
			let __this = this
			setTimeout(function() {
				__this.jump_to_next_block(null, function(){
					__this.start_change_color()
				})
		 	}, 0.5 * 1000);
		}

		private start_change_color()
		{
			if(this.is_destory)
			{
				return
			}
			let __this = this
			let blocks = GameController.instance.getAllBlocks()
			for(let index = 1; index < blocks.length; index ++)
			{
				let block = blocks[index]
				setTimeout(function() {
					block.changeGrayColor()
					if(index == blocks.length - 1)
					{
						__this.start_simulate_hide_block_animation()
					}
				}, 0.05 * (index - 1) * 1000)
			}
		}
		
		private start_simulate_hide_block_animation()
		{
			if(this.is_destory)
			{
				return
			}
			let __this = this
			let is_to_left = true
			let blocks = GameController.instance.getAllBlocks()
			let delay_index = 0
			for(let index = 1; index < blocks.length; index ++)
			{
				let block = blocks[index]
				let move_by_x_scope = 700
				let move_by_y_scope = 0
				if(is_to_left){
					move_by_x_scope *= -1
					move_by_y_scope = move_by_x_scope * GameConfig.slope_rate_left
				}else{
					move_by_y_scope = move_by_x_scope * GameConfig.slope_rate_right * -1
				}
				setTimeout(function() {
					GameUtils.tweenMoveBy(block, move_by_x_scope, move_by_y_scope, 0.4 * 1000, null, function(){
						if(index == blocks.length - 1)
						{
							__this.simulate_hide_block_animation_compelete()
						}
					}, this)
				}, 0.2 * delay_index * 1000);
				if(!(index == 2 || index == 4))
				{
					delay_index += 1
				}
				is_to_left = !is_to_left
			}
		}

		private simulate_hide_block_animation_compelete()
		{
			if(this.is_destory)
			{
				return
			}

			let blocks = GameController.instance.getAllBlocks()
			while(blocks.length > 1)
			{
				let block = blocks.pop()
				block.remove()
			}

			GameController.instance.setMaxBlockInUse(5)
			this.next_block = null
			this.auto_generate_block_and_jump()
		}

		private auto_generate_block_and_jump()
		{
			if(this.is_destory)
			{
				return
			}
			let __this = this
			let blocks = GameController.instance.getAllBlocks()
			this.current_block = this.next_block || blocks[0]
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
			
			setTimeout(function() {
				__this.play_block_push_effect(function(){
					__this.jump_to_next_block()
					setTimeout(function(){
						__this.auto_generate_block_and_jump()
					}, 0.5 * 1000)
				})
			}, 1.0 * 1000);
		}

		private play_block_push_effect(callback:Function = null)
		{
			if(callback)
				{
					callback()
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
		}


		private jump_to_next_block(push_time:number = null, callback:Function = null)
		{
			let global_block_center = this.next_block.getCenterGlobalPoint();
			let global_player_point = GameUtils.getPlayerGlobalPoint();
			let is_verse = global_block_center.x < global_player_point.x  //方向向右.

			let global_center_top_point = new egret.Point()
			let global_target_point = new egret.Point()
			if(!push_time)
			{
				push_time = GameUtils.calcTimeWhenPlayerMovePoint(global_block_center.x, global_block_center.y)
			}
			// let time = GameUtils.calcTimeWhenPlayerMovePoint(global_block_center.x, global_block_center.y)
			let seg_time = GameUtils.calcPlayerMovePoints(push_time, global_center_top_point, global_target_point)
			let local_center_point = GameUtils.convertGlobalPoint2PlayerLocalPoint(global_center_top_point.x, global_center_top_point.y);
			let local_target_point = GameUtils.convertGlobalPoint2PlayerLocalPoint(global_target_point.x, global_target_point.y);

			let is_center_on_block = true

			GameUtils.tweenMoveTo(this.player, local_center_point.x, local_center_point.y, seg_time, null, function(){
				GameUtils.tweenMoveTo(this.player, local_target_point.x, local_target_point.y, seg_time, null, function(){
					GameUtils.tweenPushPlayerDownEffect(function(){
						if(callback)
						{
							callback()
						}
					}, this)
				}, this)
			}, this)

			let rotation_scale = is_verse ? -1 : 1;
			GameUtils.tweenRotate(this.player_img, 180 * rotation_scale, seg_time, null, function(){
				GameUtils.tweenRotate(this.player_img, 360 * rotation_scale, seg_time)
			}, this)
		}

		private onClick(event:egret.TouchEvent):void
		{
			// console.log("###########", this.user_info, this.hasLogin)
			// if(!this.hasLogin || !this.user_info){
			// 	ui.PanelManager.instance.showMessage("您还未授权登录")
			// 	return
			// }

			this.parent.removeChild(this)
			this.is_destory = true
			ui.PanelManager.instance.showGamePanel()
		}

	}
}
