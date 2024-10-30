function Pizza(xpos,ypos,xv,yv,img){
	this.xpos = xpos
	this.ypos = ypos
	this.xv = xv
	this.yv = yv
	this.img = img
	this.dim = 50
	this.needs_culled = false
	this.display = function(kitty){
		this.xpos = this.xpos + this.xv
		this.ypos = this.ypos + this.yv
		image(this.img, this.xpos, this.ypos,this.dim,this.dim)

		return this.check_collision(kitty)
	}


	this.check_collision = function(kitty){
		if(this.xpos + this.dim < kitty.xpos + 50
			|| this.xpos > kitty.xpos + kitty.width - 50
			|| this.ypos + this.dim < kitty.ypos + 50
			|| this.ypos > kitty.ypos + kitty.height + 50
			){
				return false
			}
			return true
	}
	
}