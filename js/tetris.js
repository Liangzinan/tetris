var tetris={
	CELL_SIZE:26,//每个格子的宽和高
	RN:20,
	CN:10,
	OFFSET:15,//左侧和上方边框修正的宽度
	pg:null,//保存游戏主界面容器对象
	shape:null,//保存正在下落的图形
	interval:200,
	timer:null,
	wall:null,//保存所有停止下落的方块对象
	score:0,
	SCORES:[0,10,50,80,200],
	lines:0,
	level:1,
	state:1,//游戏状态：默认为启动
	GAMEOVER:0,
	RUNNING:1,
	PAUSE:2,//游戏暂停
	IMG_OVER:"img/game-over.png",
	IMG_PAUSE:"img/pause.png",
	isGameOver:function(){
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c]!=null){
				return true;
			}
		}
		return false;
	},
	randomShape:function(){
		var random=Math.floor(Math.random()*7+1);
		switch(random){
			case 1 : return new O();
			case 2 : return new T();
			case 3 : return new I();
			case 4 : return new J();
			case 5 : return new L();
			case 6 : return new S();
			case 7 : return new Z();
			default : break;			
		}
	},
	start:function(){
		var self=this;
		self.state=self.RUNNING;//重置游戏状态为运行
		self.score=0;
		self.lines=0;
		self.level=1;
		self.pg=document.querySelector(".playground");
		self.shape=self.randomShape();
		self.nextShape=self.randomShape();
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
				case 37 : self.state==self.RUNNING && self.moveLeft();break;
				case 39 : self.state==self.RUNNING && self.moveRight();break;
				case 40 : self.state==self.RUNNING && self.moveDown();break;
				case 38 : self.state==self.RUNNING && self.rotateR();break;
				case 90 : self.state==self.RUNNING && self.rotateL();break;//"Z"
				case 83 : self.state==self.GAMEOVER && self.start();break;//"S"
				case 80 :                      //"P:暂停"
					if(self.state==self.RUNNING){
						self.state=self.PAUSE;
						clearInterval(self.timer);
						self.timer=null;
						self.paint();
					}
					break;
				case 67 :                     //"C:继续"
					if(self.state==self.PAUSE){
						self.state=self.RUNNING;
						self.timer=setInterval(function(){
							self.moveDown();
						},self.interval);
					}
					break;
				case 81 :                      //"Q:结束"
					if(self.state!=self.GAMEOVER){
						self.state=self.GAMEOVER;
						if(self.timer!=null){
							clearInterval(self.timer);
							self.timer=null;
						}
						self.paint();
					}
					break;
				default : break;
			}
		}
		self.paint();
	},
	canRotate:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c<0 || cell.c>=this.CN || cell.r<0 || cell.r>=this.RN || this.wall[cell.r][cell.c]!=null){
				return false;
			}
		}
		return true;
	},
	rotateR:function(){
		this.shape.rotateR();
		if(!this.canRotate()){
			this.shape.rotateL();
		}
	},
	rotateL:function(){
		this.shape.rotateL();
		if(!this.canRotate()){
			this.shape.rotateR();
		}
	},
	canLeft:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==0||this.wall[cell.r][cell.c-1]){
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
			if(!this.isGameOver()){
				this.shape=this.nextShape;
				this.nextShape=this.randomShape();
			}else{
				clearInterval(this.timer);
				this.timer=null;
				this.state=this.GAMEOVER;
			}
		}
		this.paint();
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
	deleteRow:function(r){//有问题
		/*while(this.wall[row-2]){
			for(var c=0;c<this.CN;c++){
				this.wall[row][c]=this.wall[row-1][c];
				this.wall[row-1][c]=[];
				if(this.wall[row][c]!=null){
					this.wall[row][c].r++;
				}
			}
			row--;
		}*/
	    for(;r>0;r--){
	        this.wall[r]=this.wall[r-1];
	        this.wall[r-1]=new Array(this.CN);
	        for(var c=0;c<this.CN;c++){
	        this.wall[r][c]!==undefined
	          &&this.wall[r][c].r++;
	        }
	        if(this.wall[r-2].join("")==""){
	        	break;
	        }
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
	paintScore:function(){
		var spans=document.querySelectorAll(".playground>p>span");
		spans[0].innerHTML=this.score;
		spans[1].innerHTML=this.lines;
		spans[2].innerHTML=this.level;
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
	},
	paintNextShape:function(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.nextShape.cells.length;i++){
			var img=new Image();
			var cell=this.nextShape.cells[i];
			img.src=cell.img;
			img.style.top=(cell.r+1)*this.CELL_SIZE+this.OFFSET+"px";
			img.style.left=(cell.c+11)*this.CELL_SIZE+this.OFFSET+"px";
			frag.appendChild(img);
		}
		this.pg.appendChild(frag);
	},
	paintState:function(){
		var img=new Image();
		switch(this.state){
			case this.GAMEOVER : img.src=this.IMG_OVER;break;
			case this.PAUSE : img.src=this.IMG_PAUSE;break;
		}
		this.pg.appendChild(img);
	},
	paint:function(){//专门负责重绘一切
		var reg=/<img(.*?)>/g;
		this.pg.innerHTML=this.pg.innerHTML.replace(reg,"");
		this.paintShape();
		this.paintNextShape();
		this.paintWall();
		this.paintScore();
		this.paintState();
	}
}
window.onload=function(){
	tetris.start();
}