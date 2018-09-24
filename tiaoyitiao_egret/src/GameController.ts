class GameController {

	private max_block_in_use:number = 3
	private static _instance:GameController = null;

	public mainScene:ui.BaseGameScene

	private _blockCaches:Array<ui.BlockObject> = [];

	private _pushSound:egret.Sound = null
	private _pushSoundChannel:egret.SoundChannel = null
	private _jumpSound:egret.Sound = null
	private _jumpSoundChannel:egret.SoundChannel = null

	public start_play_time:number = 0
	
	public constructor() {
	}

	public static get instance():GameController{
		if(!GameController._instance){
			GameController._instance = new GameController();
		}
		return GameController._instance
	}

	public setMaxBlockInUse(max_number):void
	{
		this.max_block_in_use = max_number
	}

	public setMainGameScene(mainScene:ui.BaseGameScene){
		this.mainScene = mainScene
	}

	public getCurrentBlock():ui.BlockObject{
		return this.mainScene.current_block
	}

	public getNextBlock():ui.BlockObject{
		return this.mainScene.next_block
	}

	public createBlock(curstom_container:egret.DisplayObjectContainer = null):ui.BlockObject{
		let new_block = new ui.BlockObject();
		curstom_container = curstom_container ? curstom_container:this.mainScene.block_container
		curstom_container.addChildAt(new_block, 1);
		this.pushBlock(new_block)
		return new_block;
	}

	public pushBlock(new_block:ui.BlockObject):void{
		this._blockCaches.push(new_block)
		if(this._blockCaches.length > GameController.instance.max_block_in_use){
			let first_block = this._blockCaches.shift()
			first_block.remove();
		}
	}

	public getAllBlocks():Array<ui.BlockObject>
	{
		return this._blockCaches
	}

	public generateNextBlock(scale_block:number = 1):ui.BlockObject{
		let new_block = this.createBlock();
		new_block.scaleX = new_block.scaleY = scale_block
		let random_x = 0
		let random_y = 0
		let random_is_left = Math.floor(Math.random() * 2) == 0;
		if(this.mainScene.is_first_start){
			random_is_left = false
		}
			
		random_x = Math.floor(Math.random() * (GameConfig.max_random_x - GameConfig.min_random_x) + GameConfig.min_random_x) * scale_block;
		if(random_is_left){
			random_x *= -1;
		}

		if(random_is_left){
			random_y = GameConfig.slope_rate_left * random_x;
		}else{
			random_y = GameConfig.slope_rate_right * random_x;
		}
		let next_x = this.getCurrentBlock().x + random_x;
		let next_y = this.getCurrentBlock().y + random_y;
		new_block.x = next_x;
		new_block.y = next_y;

		return new_block;
	}

	public generateSimulateBlock(lastX:number = 0, lastY:number = 0,  is_twice:boolean = false):Array<ui.BlockObject>
	{
		let scale = 0.6
		let blocks:Array<ui.BlockObject> = []
		
		let random_x = 0
		let random_y = 0
		let random_is_left = false;
		if(this.mainScene.is_first_start){
			random_is_left = false
		}
			
		random_x = GameConfig.min_simulate_random_x * scale * 0.7
		random_y = GameConfig.slope_rate_right * random_x;

		let next_x = 0;
		let next_y = 0;
		if(lastX != 0  || lastY != 0){
			next_x = lastX + random_x;
			next_y = lastY + random_y;
		}else{
			next_x = GameConfig.default_simulate_init_block_x
			next_y = GameConfig.default_simulate_init_block_y
		}

		if(is_twice){
			// random_x = 200 * scale * 0.7
			random_y = GameConfig.slope_rate_left * random_x;
		}
		let block_count = is_twice ? 2 : 1;
		for(let block_index = block_count - 1; block_index >= 0; block_index--)
		{
			if(block_count == 2){
				let temp = 1;
			}
			let new_block = this.createBlock();
			new_block.scaleX = new_block.scaleY = scale;
			new_block.x = next_x;
			new_block.y = next_y;
			
			new_block.x += (block_index - (block_count - 1) / 2) * random_x
			new_block.y += (block_index - (block_count - 1)  / 2) * random_y
			blocks.push(new_block)
		}

		return blocks
	}

	//自动调整所有节点容器的位置，可理解为移动摄像头，调整聚焦位置
	//保持当前block和下一个block的中点在屏幕中间
	public moveCarmera():void
	{
		let current_block = this.getCurrentBlock();
		let next_block = this.getNextBlock();

		let center_x = (current_block.x + next_block.x) / 2 + current_block.width / 2;
		let center_y = (current_block.y + next_block.y) / 2 + current_block.height / 2;
		let global_center_point = GameUtils.convertLocalPointInNode2GlobalPoint(this.mainScene.block_container, center_x, center_y)
		let delta_x = GameUtils.stage.stageWidth / 2 - global_center_point.x
		let delta_y = GameUtils.stage.stageHeight / 2 - global_center_point.y

		//准备状态下，不需要有移动效果，直接设置位置
		if(this.isInFirstReadyState()){
			this.mainScene.is_first_start = false;
			this.mainScene.move_container.x += delta_x;
			this.mainScene.move_container.y += delta_y;
		}else{
			GameUtils.tweenMoveBy(this.mainScene.move_container, delta_x, delta_y, 0.5 * 1000)
			let cur_y = this.mainScene.next_block.y
			this.mainScene.next_block.y -= 200
			let __this = this
			GameUtils.tweenBounceUp(next_block, next_block.y + 200, 100, 0.2 * 1000, 0.1 * 1000)
		}
	}

	//是否在准备状态
	//准备状态下，块生成时，不需要有弹起的效果；初始的两个块出现不需要移动摄像头位置。
	public isInFirstReadyState()
	{
		return this.mainScene.is_first_start
	}

	public clear():void
	{
		this._blockCaches = []
	}

	public playPushSound()
	{	
		if(!this._pushSound){
			this._pushSound = RES.getRes("push_mp3");
		}
		if(this._jumpSoundChannel){
			this._jumpSoundChannel.stop()
		}
  		this._pushSoundChannel = this._pushSound.play(0, 1);
	}

	public playJumpSound()
	{	
		if(!this._jumpSound){
			this._jumpSound = RES.getRes("jump_mp3");
		}
		if(this._pushSoundChannel){
			this._pushSoundChannel.stop()
		}
  		this._jumpSoundChannel = this._jumpSound.play(0, 1);
	} 
}