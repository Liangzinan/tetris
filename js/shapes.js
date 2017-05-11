//Cell类型：描述所有格子的属性和方法
function Cell(r,c,img){
	this.r=r;
	this.c=c;
	this.img=img;
}
//Shape类型：描述所有图形的属性和方法
function Shape(){

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
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].r++;
		}
	},
	moveLeft:function(){
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].c--;
		}
	},
	moveRight:function(){
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].c++;
		}
	}
}

//每种图形类型的对象
function O(){
	Shape.call(this);
	this.cells=[
		new Cell(0,4,this.IMGS.O),new Cell(0,5,this.IMGS.O),new Cell(1,4,this.IMGS.O),new Cell(1,5,this.IMGS.O)
	]
}
Object.setPrototypeOf(O.prototype,Shape.prototype);
function T(){
	Shape.call(this);
	this.cells=[
		new Cell(0,3,this.IMGS.T),new Cell(0,4,this.IMGS.T),new Cell(0,5,this.IMGS.T),new Cell(1,4,this.IMGS.T)
	]
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function I(){
	Shape.call(this);
	this.cells=[
		new Cell(0,3,this.IMGS.I),new Cell(0,4,this.IMGS.I),new Cell(0,5,this.IMGS.I),new Cell(0,6,this.IMGS.I)
	]
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function J(){
	Shape.call(this);
	this.cells=[
		new Cell(0,4,this.IMGS.J),new Cell(0,5,this.IMGS.J),new Cell(1,5,this.IMGS.J),new Cell(2,5,this.IMGS.J)
	]
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function L(){
	Shape.call(this);
	this.cells=[
		new Cell(0,3,this.IMGS.L),new Cell(0,4,this.IMGS.L),new Cell(0,5,this.IMGS.L),new Cell(1,4,this.IMGS.L)
	]
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function S(){
	Shape.call(this);
	this.cells=[
		new Cell(0,3,this.IMGS.S),new Cell(0,4,this.IMGS.S),new Cell(0,5,this.IMGS.S),new Cell(1,4,this.IMGS.S)
	]
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function Z(){
	Shape.call(this);
	this.cells=[
		new Cell(0,3,this.IMGS.Z),new Cell(0,4,this.IMGS.Z),new Cell(0,5,this.IMGS.Z),new Cell(1,4,this.IMGS.Z)
	]
}
Object.setPrototypeOf(T.prototype,Shape.prototype);