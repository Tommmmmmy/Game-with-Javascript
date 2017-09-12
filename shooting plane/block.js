var Block = function(game, position) {
	// position是【0, 0】格式
	var img = game.imageByName('block')
	// var image = imageFromPath('block.png')
	var o = {
		x: position[0],
		y: position[1],
		w: 50,
		h: 20,
		alive: true,
		lives: position[2] || 1,
	}
	o.image = img.image
	o.w = img.w
	o.h = img.h
	o.kill = function() {
		o.lives--
		if(o.lives < 1){
			o.alive = false
		}
	}
	var intersects = function(a, b) {
		if(aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
			if(aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
				return true
			}
		}
		return false;
	}
	o.collide = function(ball) {
		return o.alive && (intersects(o, ball) || intersects(o, ball))
	}
	return o
}