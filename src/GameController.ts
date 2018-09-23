class GameController {

	private static MAX_BLOCK_IN_USE = 3
	private static _instance:GameController = null;

	public mainScene:ui.MainGameScene

	private _blockCaches:Array<ui.BlockObject> = [];

	public constructor() {
	}

	public static get instance():GameController{
		if(!GameController._instance){
			GameController._instance = new GameController();
		}
		return GameController._instance
	}

	public setMainGameScene(mainScene:ui.MainGameScene){
		this.mainScene = mainScene
	}

	public getCurrentBlock():ui.BlockObject{
		return this.mainScene.current_block
	}

	public getNextBlock():ui.BlockObject{
		return this.mainScene.next_block
	}

	public createBlock():ui.BlockObject{
		let new_block = new ui.BlockObject();
		this.mainScene.block_container.addChild(new_block);
		this.pushBlock(new_block)
		return new_block;
	}

	public pushBlock(new_block:ui.BlockObject):void{
		this._blockCaches.push(new_block)
		if(this._blockCaches.length > GameController.MAX_BLOCK_IN_USE){
			let first_block = this._blockCaches.shift()
			first_block.remove();
		}
	}

	public generateNextBlock():ui.BlockObject{
		let new_block = this.createBlock();
		let random_x = 0
		let random_y = 0
		let random_is_left = Math.floor(Math.random() * 2) == 0;
		if(this.mainScene.is_first_start){
			random_is_left = false
		}
			
		random_x = Math.floor(Math.random() * (GameConfig.max_random_x - GameConfig.min_random_x) + GameConfig.min_random_x);
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
}