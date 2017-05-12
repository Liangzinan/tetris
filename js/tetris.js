var tetris={
	CELL_SIZE:28,//每个格子的宽和高
	RN:20,
	CN:10,
	OFFSET:15,//左侧和上方边框修正的宽度
	pg:null,//保存游戏主界面容器对象
	shape:null,//保存正在下落的图形
	interval:1000,
	timer:null,
	wall:null,//保存所有停止下落的方块对象
	score:0,
	SCORES:[0,10,50,80,200],
	lines:0,
	level:1,
	start:function(){
		var self=this;
		self.pg=document.querySelector(".playground");
		self.shape=new O();
		self.paintShape();
		self.wall=[];
		for(var r=0;r<self.RN;r++){
			self.wall.push(new Array(self.CN));
		}
		//启动周期性定时器
		self.timer=setInterval(function(){
			self.moveDown();
		},self.interval);
		document.onkeydown=function(){
			var e=window.event||arguments[0];
			switch(e.keyCode){
				case 37:
					self.moveLeft();
					break;
				case 39:
					self.moveRight();
					break;
				case 40:
					self.moveDown();
					break;
				default:
					break;
			}
		}
	},
	canLeft:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==0||this.wall[cell.r][cell.c-1]!=null){
				return false;
			}
		}
		return true;
	},
	moveLeft:function(){
		if(this.canLeft()){
			this.shape.moveLeft();
		}
	},
	canRight:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==this.CN-1||this.wall[cell.r][cell.c+1]!=null){
				return false;
			}
		}
		return true;
	},
	moveRight:function(){
		if(this.canRight()){
			this.shape.moveRight();
		}
	},
	canDown:function(){//专门检查是否可以下落
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]!=null){
				return false;
			}
		}
		return true;
	},
	moveDown:function(){//负责shape下落一步
		var reg=/<img(.*?)>/g;
		this.pg.innerHTML=this.pg.innerHTML.replace(reg,"");
		this.paintShape();
		this.paintWall();
		this.paintScore();
		if(this.canDown()){
			this.shape.moveDown();
		}else {
			for(var i=0;i<this.shape.cells.length;i++){
				var cell=this.shape.cells[i];
				this.wall[cell.r][cell.c]=cell;
			}
			var lines=this.deleteRows();
			this.score+=this.SCORES[lines];
			this.lines+=lines;
			this.shape=new O();
		}
	},
	paintScore:function(){
		var spans=document.querySelector(".playground p span");
		console.log(spans);
		/*spans[0].innerHTML="this.score";
		spans[1].innerHTML="this.lines";
		spans[2].innerHTML="this.level";*/
	},
	deleteRows:function(){
		for(var r=this.RN-1,lines=0;r>=0;r--){
			if(this.isFullRow(r)){
				this.deleteRow(r);
				r++;//刚被删除的行还要再检查一次
				lines++;
			}
		}
		return lines;
	},
	deleteRow:function(row){//有问题
		while(this.wall[row-1]){
			for(var c=0;c<this.CN;c++){
				this.wall[row][c]=this.wall[row-1][c];
				this.wall[row-1][c]=[];
				if(this.wall[row][c]!=null){
					this.wall[row][c].r++;
				}
			}
			row--;
		}
	},
	isFullRow:function(row){
		for(var c=0;c<this.CN;c++){
			if(this.wall[row][c]==null){
				return false;
			}
		}
		return true;
	},
	paintWall:function(){
		var frag=document.createDocumentFragment();
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				var cell=this.wall[r][c];
				if(cell){
					var img=new Image();
					img.src=cell.img;
					img.style.top=cell.r*this.CELL_SIZE+this.OFFSET+"px";
					img.style.left=cell.c*this.CELL_SIZE+this.OFFSET+"px";
					frag.appendChild(img);
				}
			}
		}
		this.pg.appendChild(frag);
	},
	paintShape:function(){//n专门负责绘制当前shape图形
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.shape.cells.length;i++){
			var img=new Image();
			var cell=this.shape.cells[i];
			img.src=cell.img;
			img.style.top=cell.r*this.CELL_SIZE+this.OFFSET+"px";
			img.style.left=cell.c*this.CELL_SIZE+this.OFFSET+"px";
			frag.appendChild(img);
		}
		this.pg.appendChild(frag);
	}
}
window.onload=function(){
	tetris.start();
}