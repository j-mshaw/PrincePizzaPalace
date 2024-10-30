function Prince(xpos,ypos,vx,vy,width,height,src){
	this.xpos = xpos
	this.ypos = ypos
	this.width = width
	this.height = height
	this.vy = vy
	this.vx = vx
	this.src = src
	this.heading = 1;
	this.display = function(){
		image(this.src,this.xpos, this.ypos, this.width,this.height)
		
	}


	
}