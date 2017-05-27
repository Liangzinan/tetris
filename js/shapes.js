//Cell类型：描述所有格子的属性和方法
function Cell(r,c,img){
	this.r=r;
	this.c=c;
	this.img=img;
}
//Shape类型：描述所有图形的属性和方法
function Shape(orgi){
	this.orgi=orgi;//设置参照格的下标
	this.statei=0;//设置所有图形默认状态的下标为0
}
Shape.prototype={
	IMGS:{
		O:"img/O.png",
		I:"img/I.png",
		J:"img/J.png",
		L:"img/L.png",
		S:"img/S.png",
		Z:"img/Z.png",
		T:"img/T.png"},
	moveDown:function(){
		for(var i=0;i<this.cells.length;this.cells[i++].r++){}
	},
	moveLeft:function(){
		for(var i=0;i<this.cells.length;this.cells[i++].c--){}
	},
	moveRight:function(){
		for(var i=0;i<this.cells.length;this.cells[i++].c++){}
	},
	rotateR:function(){
		this.statei++;
		this.statei==this.states.length && (this.statei=0);
		this.rotate();
	},
	rotateL:function(){
		this.statei--;
		this.statei==-1 && (this.statei=this.states.length-1);
		this.rotate();
	},
	rotate:function(){//根据当前state的数据计算图形中每个格的r和c
		var state=this.states[this.statei];
		var r=this.cells[this.orgi].r;
		var c=this.cells[this.orgi].c;
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].r=r+state[i].r;
			this.cells[i].c=c+state[i].c;
		}
	}
}
//每个图形每种状态的数据类型
function State(r0,c0,r1,c1,r2,c2,r3,c3){
	var state=[
		{r:r0,c:c0},
		{r:r1,c:c1},
		{r:r2,c:c2},
		{r:r3,c:c3}
	];
	return state;
}
//每种图形类型的对象
function O(){
	Shape.call(this,0);
	this.cells=[
		new Cell(0,4,this.IMGS.O),new Cell(0,5,this.IMGS.O),new Cell(1,4,this.IMGS.O),new Cell(1,5,this.IMGS.O)
	];
	this.states=[
		State(0,-1, 0,0, +1,-1, +1,0)
	];
}
Object.setPrototypeOf(O.prototype,Shape.prototype);
function T(){
	Shape.call(this,1);
	this.cells=[
		new Cell(0,3,this.IMGS.T),new Cell(0,4,this.IMGS.T),new Cell(0,5,this.IMGS.T),new Cell(1,4,this.IMGS.T)
	];
	this.states=[
		State(0,-1, 0,0, 0,+1, +1,0),
		State(-1,0, 0,0, +1,0, 0,-1),
		State(0,+1, 0,0, 0,-1, -1,0),
		State(+1,0, 0,0, -1,0, 0,+1)
	];
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function I(){
	Shape.call(this,1);
	this.cells=[
		new Cell(0,3,this.IMGS.I),new Cell(0,4,this.IMGS.I),new Cell(0,5,this.IMGS.I),new Cell(0,6,this.IMGS.I)
	];
	this.states=[
		State(0,-1, 0,0, 0,+1, 0,+2),
		State(-1,0, 0,0, +1,0, +2,0)
	];
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function J(){
	Shape.call(this,1);
	this.cells=[
		new Cell(0,4,this.IMGS.J),new Cell(0,5,this.IMGS.J),new Cell(1,5,this.IMGS.J),new Cell(2,5,this.IMGS.J)
	];
	this.states=[
		 State(0,-1, 0,0, +1,0, +2,0),
		 State(-1,0, 0,0, 0,-1, 0,-2),
		 State(0,+1, 0,0, -1,0, -2,0),
		 State(-1,0, 0,0, 0,+1, 0,+2)
	];
}
Object.setPrototypeOf(J.prototype,Shape.prototype);
function L(){
	Shape.call(this,1);
	this.cells=[
		new Cell(0,3,this.IMGS.L),new Cell(1,3,this.IMGS.L),new Cell(1,4,this.IMGS.L),new Cell(1,5,this.IMGS.L)
	];
	this.states=[
		State(-1,0, 0,0, +1,0, +1,+1),
		State(0,+1, 0,0, 0,-1, +1,-1),
		State(+1,0, 0,0, -1,0, -1,-1),
		State(0,-1, 0,0, 0,+1, -1,+1)
	]
}
Object.setPrototypeOf(L.prototype,Shape.prototype);
function S(){
	Shape.call(this,3);
	this.cells=[
		new Cell(0,4,this.IMGS.S),new Cell(0,5,this.IMGS.S),new Cell(1,3,this.IMGS.S),new Cell(1,4,this.IMGS.S)
	];
	this.states=[
		State(-1,0, -1,+1, 0,-1, 0,0),
		State(0,+1, +1,+1, -1,0, 0,0)
	]
}
Object.setPrototypeOf(S.prototype,Shape.prototype);
function Z(){
	Shape.call(this,2);
	this.cells=[
		new Cell(0,3,this.IMGS.Z),new Cell(0,4,this.IMGS.Z),new Cell(1,4,this.IMGS.Z),new Cell(1,5,this.IMGS.Z)
	];
	this.states=[
		State(-1,-1, -1,0, 0,0, 0,+1),
		State(-1,+1, 0,+1, 0,0, +1,0)
	]
}
Object.setPrototypeOf(Z.prototype,Shape.prototype);
