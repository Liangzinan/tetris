var tetris={
	CELL_SIZE:26,//每个格子的宽和高
	RN:20,
	CN:10,
	OFFSET:15,//左侧和上方边框修正的宽度
	pg:null,//保存游戏主界面容器对象
	shape:null,//保存正在下落的图形
	interval:1000,
	timer:null,
	wall:null,//保存所有停止下落的方块对象
	start:function(){
		var self=this;
		self.pg=document.querySelector(".playground");
		self.shape=new O();
		self.paintShape();
		for(var r=0,self.wall=[];r<self.RN;r++){
			self.wall.push(new Array(self.CN));
		}
		//启动周期性定时器
		self.timer=setInterval(function(){
			self.moveDown();
		},self.interval);
	},
	canDown:function(){//专门检查是否可以下落
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]){
				return false;
			}
		}
		return true;
	},
	moveDown:function(){//负责shape下落一步
		if(this.canDown()){
			this.shape.moveDown();
		}
		var reg=/<img(.*?)>/g;
		this.pg.innerHTML=this.pg.innerHTML.replace(reg,"");
		this.paintShape();
	},
	paintShape:function(){//专门负责绘制当前shape图形
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.shape.cells.length;i++){
			var img=new Image();
			var cell=this.shape.cells[i];
			img.style.src=cell.img;
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