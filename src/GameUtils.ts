
enum JUMP_RESULT {
	FAIL = 0,  //跳失败
	THIS_BLOCK = 1, //跳到当前block
	NEXT_BLOCK = 2,  //跳到下一个Block
};

class GameConfig{
	public static default_init_player_x:number = -80;
	public static default_init_player_y:number = 816;

	public static slope_rate_right:number = -0.5783;
	public static slope_rate_left:number = 0.5729;

	public static min_random_x:number = 220;
	public static max_random_x:number = 300;

	public static min_simulate_random_x:number = 200;

	public static default_simulate_init_player_x:number = 56  
	public static default_simulate_init_player_y:number = 878

	public static default_simulate_init_block_x:number = 32;
	public static default_simulate_init_block_y:number = 702;

	public static push_down_acce:number = 40;  //下压加速度
	public static gravity_acce:number = 10;  //重力加速度
	public static move_speed_distance:number = 50; //移动的速度
}

class GameUtils {

	public static stage:egret.Stage;
	
	private static _instance:GameUtils = null;
	public line_infos:Array<egret.Point> = null;
	public line_points:Array<egret.Point> = null;
	public static mainGameScene:ui.MainGameScene;

	public constructor() 
	{
		this.init();
	} 

	public static getInstance():GameUtils{
		if(GameUtils._instance == null){
			GameUtils._instance = new GameUtils();
		}
		return GameUtils._instance;
	}

	private init():void
	{
		let new_block = new ui.BlockObject();
		this.setBounds(
				new egret.Point(new_block.node1.x, new_block.node1.y),
				new egret.Point(new_block.node2.x, new_block.node2.y),
				new egret.Point(new_block.node3.x, new_block.node3.y),
				new egret.Point(new_block.node4.x, new_block.node4.y));
	}

	public setBounds(point1:egret.Point, point2:egret.Point, point3:egret.Point, point4:egret.Point):void{
		this.line_infos = new Array<egret.Point>();
		this.line_points = new Array<egret.Point>();
		this.line_points.push(point1);
		this.line_points.push(point2);
		this.line_points.push(point3);
		this.line_points.push(point4);

		let line_info = new egret.Point();
		line_info.x = (point1.y - point2.y) / (point1.x - point2.x)
		line_info.y = point1.y - line_info.x * point1.x
		this.line_infos.push(line_info)

		line_info = new egret.Point();
		line_info.x = (point2.y - point3.y) / (point2.x - point3.x)
		line_info.y = point2.y - line_info.x * point2.x
		this.line_infos.push(line_info)

		line_info = new egret.Point();
		line_info.x = (point3.y - point4.y) / (point3.x - point4.x)
		line_info.y = point3.y - line_info.x * point3.x
		this.line_infos.push(line_info)

		line_info = new egret.Point();
		line_info.x = (point4.y - point1.y) / (point4.x - point1.x)
		line_info.y = point4.y - line_info.x * point4.x
		this.line_infos.push(line_info)
	}
	
	private getYInLineIndex(x:number, line_index:number):number{
		return this.line_infos[line_index].x * x + this.line_infos[line_index].y;
	}

	public isInBound(point:egret.Point):boolean{
		let line_index_array:Array<number> = new Array<number>();
		let has_cache:Object = {};
		let except_line_index_array:Array<number> = new Array<number>();
		for(let line_Index = 0; line_Index < this.line_infos.length; line_Index ++){
			if(except_line_index_array.indexOf(line_Index) != -1){
				continue;
			}
			let temp_point_1 = this.line_points[line_Index]
			let temp_point_2 = this.line_points[(line_Index + 1) % this.line_infos.length];
			let min_x = Math.min(temp_point_1.x, temp_point_2.x)
			let max_x = Math.max(temp_point_1.x, temp_point_2.x)
			if(point.x > min_x && point.x < max_x){
				line_index_array.push(line_Index);
			}else if(point.x == min_x || point.x == max_x){
				if(!has_cache[point.x]){
					line_index_array.push(line_Index);
					has_cache[point.x] = line_Index;
					if(point.x == temp_point_1.x){
						except_line_index_array.push((line_Index - 1 + this.line_infos.length) % this.line_infos.length);
					}else{
						except_line_index_array.push((line_Index + 1) % this.line_infos.length);
					}
				}else{
					egret.error("can not come here....1");
				}
			}
		}
		if(line_index_array.length < 2){
			return false;
		}
		
		if(line_index_array.length > 2){
			egret.error("can not come here....2")
			return false;
		}

		let y_line_index_1 = this.getYInLineIndex(point.x, line_index_array[0]);
		let y_line_index_2 = this.getYInLineIndex(point.x, line_index_array[1]);

		let y_max_in_2_3 = Math.max(y_line_index_1, y_line_index_2);
		let y_min_in_2_3 = Math.min(y_line_index_1, y_line_index_2);

		return point.y >= y_min_in_2_3 && point.y <= y_max_in_2_3;

	}

	private static getNodeGlobalPoint(display_object:egret.DisplayObject):egret.Point
	{
		let tempPoint = new egret.Point();
		display_object.parent.localToGlobal(display_object.x, display_object.y, tempPoint);
		return tempPoint;
	}

	//获取角色的全局位置
	public static getPlayerGlobalPoint():egret.Point{
		return this.getNodeGlobalPoint(GameController.instance.mainScene.player)
	}

	//转换全局坐标成角色的本地坐标
	public static convertGlobalPoint2PlayerLocalPoint(globalX:number, globalY:number):egret.Point{
		let tempPoint = new egret.Point();
		let player = GameController.instance.mainScene.player
		player.parent.globalToLocal(globalX, globalY, tempPoint);
		return tempPoint;
	}

	//某个对象的局部坐标转换成全局坐标
	public static convertLocalPointInNode2GlobalPoint(displayObject:egret.DisplayObject, localX:number, localY:number):egret.Point{
		let tempPoint = new egret.Point();
		displayObject.localToGlobal(localX, localY, tempPoint);
		return tempPoint
	}

	//某个点是不是在当前的块上
	public static isPointInCurrentBlock(global_point_x:number, global_point_y:number):boolean{
		let local_in_curr_block = GameController.instance.getCurrentBlock().globalToLocal(global_point_x, global_point_y)
		let is_in_current_block_bound = GameUtils.getInstance().isInBound(local_in_curr_block)
		return is_in_current_block_bound
	}

	//某个点是不是在下一个块上
	public static isPointInNextBlock(global_point_x:number, global_point_y:number):boolean{
		let local_in_next_block = GameController.instance.getNextBlock().globalToLocal(global_point_x, global_point_y)
		let is_in_next_block_bound = GameUtils.getInstance().isInBound(local_in_next_block)
		return is_in_next_block_bound
	}

	//某个点是不是在有效的块上（当前块和下一个块）。
	//为了得到具体信息，这里返回具体数值，而不是返回boolean，这样业务可以根据返回值去处理。
	public static isPointOnBlock(global_point_x:number, global_point_y:number):JUMP_RESULT{
		let is_in_current_block_bound = GameUtils.isPointInCurrentBlock(global_point_x, global_point_y)
		let is_in_next_block_bound = GameUtils.isPointInNextBlock(global_point_x, global_point_y)

		if(!is_in_current_block_bound && !is_in_next_block_bound){
			return JUMP_RESULT.FAIL;
		}
		if(is_in_current_block_bound){
			return JUMP_RESULT.THIS_BLOCK;
		}
		if(is_in_next_block_bound){
			return JUMP_RESULT.NEXT_BLOCK
		}
	}

	/**
	 * displayObject：需要移动的对象
	 * target_x：目标x值
	 * target_y：目标y值
	 * time：移动时间
	 * effect：移动效果
	 * callback：回调
	 * callbackThis：回调的对象
	 */
	public static tweenMoveTo(displayObject:egret.DisplayObject, target_x:number, target_y:number, time:number, effect:Function = null, callback:Function = null, callbackThis:Object = null):void
	{
		let tween = egret.Tween.get(displayObject);
		tween.to({x:target_x, y:target_y}, time, effect).call(function(){
			if(callback){
				callback.apply(callbackThis)
			}
		})
	}

	public static tweenMoveBy(displayObject:egret.DisplayObject, target_x:number, target_y:number, time:number, effect:Function = null, callback:Function = null, callbackThis:Object = null):void
	{
		GameUtils.tweenMoveTo(displayObject, displayObject.x + target_x, displayObject.y + target_y, time, effect, callback, callbackThis)
	}

	/**
	 * displayObject:需要移动的对象
	 * target_y：目标y值
	 * up_height：弹起来的高度
	 * down_time：下移的时间
	 * bounce_time：弹起的时间
	 * callback：回调
	 * callbackThis：回调的对象
	 */
	public static tweenBounceUp(displayObject:egret.DisplayObject, target_y:number, up_height:number, down_time:number, bounce_time:number, callback:Function = null, callbackThis:Object = null):void
	{
		let block_tween = egret.Tween.get(displayObject);
		block_tween.to({y:target_y}, down_time, egret.Ease.sineIn)
		.to({y:target_y - up_height}, bounce_time, egret.Ease.sineOut)
		.to({y:target_y}, bounce_time, egret.Ease.sineIn)
		.call(function(){
			if(callback)
			{
				callback.apply(callbackThis)
			}
		})
	}

	public static tweenRotate(displayObject:egret.DisplayObject, rotation:number, rotation_time:number, ease:Function = null, callback:Function = null, callbackThis:Object = null)
	{
		let rotate_tween = egret.Tween.get(displayObject)
		rotate_tween.to({rotation:rotation}, rotation_time, ease)
		.call(function(){
			if(callback){
				callback.apply(callbackThis)
			}
		})
	}

	public static tweenScaleTo(displayObject:egret.DisplayObject, target_scaleX:number, target_scaleY:number, time:number, ease:Function = null, callback:Function = null, callbackThis:Object = null)
	{
		let tween = egret.Tween.get(displayObject)
		tween.to({scaleX:target_scaleX, scaleY:target_scaleY}, time, ease)
		.call(function(){
			if(callback)
			{
				callback.apply(callbackThis)
			}
		})
	}

	/**
	 * 按下按钮，角色的动画效果
	 */
	public static tweenPushPlayerDownEffect(callback:Function = null, callbackThis:Object = null)
	{
		let move_tween2 = egret.Tween.get(GameController.instance.mainScene.player)
		move_tween2.to({scaleX:1.3, scaleY:0.7}, 0.08 * 1000, egret.Ease.sineIn)
		.to({scaleX:1, scaleY:1}, 0.05 * 1000).call(function(){
			if(callback)
			{
				callback.apply(callbackThis)
			}
		})
	}

	public static calcPlayerRotationIfJumpFail(player_target_x:number, player_target_y:number, dict_right:boolean):number
	{
		let is_left_on_block = GameUtils.isPointOnBlock(player_target_x - 24, player_target_y) != JUMP_RESULT.FAIL //左边有没有停在block上面
		let is_right_on_block = GameUtils.isPointOnBlock(player_target_x + 24, player_target_y) != JUMP_RESULT.FAIL //右边
		let _rotation = 0
						
		if(dict_right){
			if(!is_left_on_block && is_right_on_block){
				_rotation = -110
			}else if(is_left_on_block && !is_right_on_block){
				_rotation = 70
			}
		}else{
			if(is_left_on_block && !is_right_on_block){
				_rotation = 110
			}else if(is_right_on_block && !is_left_on_block){
				_rotation = -70
			}
		}
		return _rotation
	}

	public static calcTimeWhenPlayerMovePoint(target_x:number, target_y:number)
	{
		let global_block_center = GameController.instance.getNextBlock().getCenterGlobalPoint();
		let global_player_point = GameUtils.getPlayerGlobalPoint();
		let temp_degree = Math.atan((global_block_center.y - global_player_point.y) / (global_block_center.x - global_player_point.x))
		if(global_block_center.x > global_player_point.x){
			temp_degree = -1 * temp_degree
		}else{
			temp_degree = Math.PI - temp_degree
		}

		let rate_x = Math.cos(temp_degree)
		let rate_y = Math.sin(temp_degree)
		
		return (target_x - global_player_point.x) / (2 * rate_x * GameConfig.move_speed_distance) * GameConfig.gravity_acce / GameConfig.push_down_acce
	}

	public static TestCalcDeltaXByPushTime(push_down_time:number)
	{
		let push_down_speed = GameConfig.push_down_acce * push_down_time  //松开后的速度
		let half_move_time = push_down_speed / GameConfig.gravity_acce  //计算向上运动的时间
		let total_move_time = half_move_time * 2

		let speed_distance = GameConfig.move_speed_distance
		let target_height = push_down_speed * half_move_time * 0.5  //计算向上运动的高度

		let global_block_center = GameController.instance.getNextBlock().getCenterGlobalPoint();
		let global_player_point = GameUtils.getPlayerGlobalPoint();
		let temp_degree = Math.atan((global_block_center.y - global_player_point.y) / (global_block_center.x - global_player_point.x))
		if(global_block_center.x > global_player_point.x){
			temp_degree = -1 * temp_degree
		}else{
			temp_degree = Math.PI - temp_degree
		}

		let rate_x = Math.cos(temp_degree)
		let rate_y = Math.sin(temp_degree)


		return speed_distance * total_move_time * rate_x

	}

	public static calcPlayerMovePoints(push_down_time:number, global_center_top_point:egret.Point, global_target_point:egret.Point):number
	{
		let push_down_speed = GameConfig.push_down_acce * push_down_time  //松开后的速度
		let half_move_time = push_down_speed / GameConfig.gravity_acce  //计算向上运动的时间
		let total_move_time = half_move_time * 2

		let speed_distance = GameConfig.move_speed_distance
		let target_height = push_down_speed * half_move_time * 0.5  //计算向上运动的高度

		let global_block_center = GameController.instance.getNextBlock().getCenterGlobalPoint();
		let global_player_point = GameUtils.getPlayerGlobalPoint();
		let temp_degree = Math.atan((global_block_center.y - global_player_point.y) / (global_block_center.x - global_player_point.x))
		if(global_block_center.x > global_player_point.x){
			temp_degree = -1 * temp_degree
		}else{
			temp_degree = Math.PI - temp_degree
		}

		let rate_x = Math.cos(temp_degree)
		let rate_y = Math.sin(temp_degree)


		let target_x = global_player_point.x + speed_distance * total_move_time * rate_x
		let target_y = global_player_point.y - speed_distance * total_move_time * rate_y

		let origin_center_x = (global_player_point.x + target_x) / 2;
		let oring_center_y = (global_player_point.y + target_y) / 2;

		let center_x = origin_center_x - target_height * Math.abs(rate_y);
		let center_y = oring_center_y - target_height * Math.abs(rate_x);

		global_center_top_point.x = center_x
		global_center_top_point.y = center_y

		global_target_point.x = target_x
		global_target_point.y = target_y
		return 1000 * 0.15
	}

	public static addButtonClick(button:eui.Button, callback:Function, callbackThis:Object):void
	{
		button.enabled = true;
		button.touchEnabled = true;
		button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(){
			GameUtils.tweenScaleTo(button, 0.9, 0.9, 0.1 * 1000, null)
		}, this)
		button.addEventListener(egret.TouchEvent.TOUCH_END, function(){
			GameUtils.tweenScaleTo(button, 1, 1, 0.2 * 1000, null)
		}, this)
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
			if(callback)
			{
				callback.apply(callbackThis)
			}
		}, this)
	}

	
}