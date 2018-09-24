module ui {
	export class BlockObject extends eui.Component{

		private res_keys : Array<string> = ["block1_png", "block2_png", "block3_png"];
		public node1 : egret.DisplayObject;
		public node2 : egret.DisplayObject;
		public node3 : egret.DisplayObject;
		public node4 : egret.DisplayObject;
		public center : egret.DisplayObject;

		public container : egret.DisplayObject;
		public radio_right : number;
		public radio_left : number;

		private label_index : eui.Label
		private img : eui.Image;
		
		public constructor() {
			super();
			this.skinName = "block";
			this.center = new egret.DisplayObject();
			this.center.x = (this.node1.x + this.node3.x) / 2;
			this.center.y = (this.node2.y + this.node4.y) / 2 + 20;
			this.addChild(this.center);
			// console.log(this.center.x, this.center.y);
			
			this.radio_right = (this.node3.y - this.node4.y) / (this.node3.x - this.node4.x)
			this.radio_left = (this.node1.y - this.node4.y) / (this.node1.x - this.node4.x)
			this.label_index.visible = false
			this.reUse()
		}
		
		public setIndex(index:number):void
		{
			this.label_index.visible = true
			this.label_index.text = index.toString()
		}

		private getNodeGlobalPoint(displayObject:egret.DisplayObject):egret.Point{
			let tempPoint = new egret.Point();
			displayObject.parent.localToGlobal(displayObject.x, displayObject.y, tempPoint);
			return tempPoint;
		}

		public getNodeLocalPoint(container:egret.DisplayObject, globalPoint:egret.Point):egret.Point{
			let tempPoint = new egret.Point();
			container.globalToLocal(globalPoint.x, globalPoint.y, tempPoint);
			return tempPoint;
		}

		public getNode1GlobalPoint():egret.Point{
			return this.getNodeGlobalPoint(this.node1);
		}

		public getNode2GlobalPoint():egret.Point{
			return this.getNodeGlobalPoint(this.node2);
		}

		public getNode3GlobalPoint():egret.Point{
			return this.getNodeGlobalPoint(this.node3);
		}

		public getNode4GlobalPoint():egret.Point{
			return this.getNodeGlobalPoint(this.node4);
		}

		public getCenterGlobalPoint():egret.Point{
			return this.getNodeGlobalPoint(this.center);
		}

		public getLeftTopGlobalPoint():egret.Point{
			let tempPoint = new egret.Point();
			this.localToGlobal(0, 0, tempPoint);
			return tempPoint;
		}

		public isInLeft():boolean{
			let block_center_x = this.width;
			let block_center_y = this.height / 2;
			let tempPoint = new egret.Point();
			this.localToGlobal(block_center_x, block_center_y, tempPoint);
			return tempPoint.x < GameUtils.stage.stageWidth / 2;
		}

		public getValidWidth():number{
			return this.node3.x - this.node1.x;
		}

		public TestBounds():void{
			let test_names = ["node5", "node6", "node7", "node8", "node9"]
			for(let index in test_names){
				let name = test_names[index]
				let child = this[name]
				let isHit:boolean = GameUtils.getInstance().isInBound(new egret.Point(child.x, child.y))
				console.log("is hit", isHit, name)
			}
		}

		//角色是否在中间的区域
		public getPlayerScore()
		{
			let global_player_point = GameUtils.getPlayerGlobalPoint();
			let global_block_center_point = this.getCenterGlobalPoint()
			if(Math.abs(global_block_center_point.x - global_player_point.x ) <= 10 && Math.abs(global_block_center_point.y - global_player_point.y) <= 10)
			{
				return 10;
			}

			if(Math.abs(global_block_center_point.x - global_player_point.x ) <= 20 && Math.abs(global_block_center_point.y - global_player_point.y) <= 20)
			{
				return 8;
			}

			if(Math.abs(global_block_center_point.x - global_player_point.x ) <= 30 && Math.abs(global_block_center_point.y - global_player_point.y) <= 30)
			{
				return 6;
			}

			return 5;
		}

		public reUse():void
		{
			let name_index = Math.floor(Math.random() * this.res_keys.length)
			let name = this.res_keys[name_index];
			this.img.texture = RES.getRes(name)
		}

		public changeGrayColor()
		{
			let name_index = 2
			let name = this.res_keys[name_index];
			this.img.texture = RES.getRes(name) 
		}

		public remove():void
		{
			this.parent.removeChild(this);
		}
	}
}